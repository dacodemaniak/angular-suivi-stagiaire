import { APP_INITIALIZER, Injectable } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';
import { Logger } from '../helpers/logger';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private userService: UserService
  ) {}

  public init(): Promise<void> {
    return new Promise(
      (resolve) => {
        this.userService.getToken();
        Logger.info(`A user or no user was found according local or session storage`);
        resolve();
      }
    );
  }
}

export const initializeApp = (appInitService: AppInitService): any => {
  return (): Promise<void> => {
    return appInitService.init();
  }
}

export const appInit = {
  provide: APP_INITIALIZER,
  useFactory: initializeApp, // Utilise la fonction qui instancie le service et appelle la méthode init()
  deps: [ // DI à la main
    AppInitService
  ],
  multi: true
}
