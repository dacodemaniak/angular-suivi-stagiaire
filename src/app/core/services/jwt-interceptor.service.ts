import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/user/models/user-model';
import { UserService } from 'src/app/user/services/user.service';
import { Logger } from '../helpers/logger';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private userService: UserService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // We have to add an Authorization header to the HTTP Request if a user was authenticated
    if (this.userService.isAuthenticated()) {
      Logger.info(`JwtInterceptorService-20::A user was authenticated`);
      // Faudrait que je récupère le token !!!
      const authenticatedUser: UserModel | null = this.userService.getUser();
      // Cloner la requête en lui ajoutant l'en-tête souhaitée
      if (authenticatedUser !== null) {
        if (!req.headers.has('Authorization')) {
          req = req.clone(
            { headers: req.headers.set('Authorization', `Bearer ${authenticatedUser.getToken()}`) }
          );
        }
      }
    }

    return next.handle(req);
  }
}
