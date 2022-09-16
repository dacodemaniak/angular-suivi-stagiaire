import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Logger } from 'src/app/core/helpers/logger';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: UserModel | null = null;

  /**
   * Class constant always uppercase
   */
  private readonly STORAGE_KEY: string = 'auth-token';

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  /**
   * 
   * @param credentials From signinForm (login and password user entered)
   * credentials => {login: 'bond', pass:'007'} <= this.signinForm.value
   */
  public signin(credentials: any): void {

    this.httpClient.get<any>(
      `http://localhost:3000/users?login=${credentials.login}&pass=${credentials.pass}`
    )
    .pipe(
      take(1)
    )
    .subscribe((anyUsers: any) => {
      Logger.info(JSON.stringify(anyUsers));
      if (anyUsers.length) {
        // Got a user...
        this.user = new UserModel();
        this.user.setLogin(anyUsers[0].login);
        this.user.setToken(anyUsers[0].token);

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.user));
      }
    });

    Logger.info(`Continue to do what you want...`);
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
    if (this.user === null) {
      return false;
    }

    return true;
  }

  public getToken(): void {
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
  }
}
