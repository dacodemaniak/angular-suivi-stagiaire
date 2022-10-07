import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environment/environment';
import { Observable, take, tap } from 'rxjs';
import { Logger } from 'src/app/core/helpers/logger';
import { StorageStrategyFactory } from 'src/app/core/helpers/storage-strategy-factory';
import { UserModel } from '../models/user-model';
import { IStorage } from '../strategies/i-storage';
import { LocalStrategy } from '../strategies/local-strategy';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: UserModel | null = null;
  
  /**
   * Storage strategy to use to store in local or session Storage
   */
  private storage: IStorage = StorageStrategyFactory.getInstance();

  /**
   * Class constant always uppercase
   */
  private readonly STORAGE_KEY: string = 'auth-token';

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  public setStorageStrategy(strategy: IStorage): void {
    this.storage = strategy;
  }

  /**
   * 
   * @param credentials From signinForm (login and password user entered)
   * credentials => {login: 'bond', pass:'007'} <= this.signinForm.value
   * Je dois passer {userName: ?, userPass: ?}
   */
  public signin(credentials: any): Observable<any> {
    const payload: any = {
      userName: credentials.login,
      userPass: credentials.pass
    };

    return this.httpClient.post<any>(
      `${environment.apiRoot}user/signin`,
      payload
    )
    .pipe(
     tap((response) => {
      this.user = new UserModel();
      this.user.setLogin(credentials.login);
      this.user.setToken(response.token);
      this.storage.store(this.STORAGE_KEY, JSON.stringify(this.user));
     }) 
    );
  }

  public signout(): void {
    this.user = null;

    // Remove the key in Local or Session storage
    this.storage.remove(this.STORAGE_KEY);

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

  public getUser(): UserModel | null {
    return this.user;
  }

  public getToken(): void {
    const userAsString: string | null = this.storage.get(this.STORAGE_KEY);
    
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
