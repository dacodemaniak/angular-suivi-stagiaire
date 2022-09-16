import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from 'src/app/core/helpers/logger';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [
    {
      login: 'bond',
      pass: '007'
    },
    {
      login: 'casper',
      pass: 'ghost'
    }
  ];

  private user: UserModel | null = null;

  /**
   * Class constant always uppercase
   */
  private readonly STORAGE_KEY: string = 'auth-token';

  constructor(
    private router: Router
  ) { }

  /**
   * 
   * @param credentials From signinForm (login and password user entered)
   * credentials => {login: 'toto', pass:'titi'}
   */
  public signin(credentials: any): void {
    Logger.info(JSON.stringify(credentials));
    // Approche JL : find
    const foundUser: any = this.users.find(
      (inUser: any) => inUser.login === credentials.login && inUser.pass === credentials.pass
    );
    if (foundUser) {
      this.user = new UserModel();
      this.user.setLogin(credentials.login);
      this.user.setToken('yyyyyyy.xxxxxx.zzzzzz');

      // Persist in Local or Session storage user that found
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.user));
    }
  }

  public signout(): void {
    this.user = null;

    // Remove the key in Local or Session storage
    localStorage.removeItem(this.STORAGE_KEY);

    this.router.navigate(['/', 'signin']);


  }

  /**
   * 
   * @returns Yes or No a user was authenticated
   */
  public isAuthenticated(): boolean {
    const userAsString: string | null = localStorage.getItem(this.STORAGE_KEY);
    
    if (userAsString !== null) {
      // Y a bien qq chose dans localStorage à la clé auth-token
      this.user = new UserModel(); // Je refais une instance d'un UserModel
      
      // Je parse la chaîne user pour récupérer un objet
      const persistentUser: any = JSON.parse(userAsString); // Parse is the inverse of Stringify
      
      // Je finis de définir this.user
      this.user.setLogin(persistentUser.login);
      this.user.setToken(persistentUser.token);
    }

    if (this.user === null) {
      return false;
    }

    return true;
  }
}
