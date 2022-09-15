import { Injectable } from '@angular/core';
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

  constructor() { }

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
    }
  }

  public signout(): void {
    this.user = null;
  }

  /**
   * 
   * @returns Yes or No a user was authenticated
   */
  public isAuthenticated(): boolean {
    return this.user !== null;
  }
}
