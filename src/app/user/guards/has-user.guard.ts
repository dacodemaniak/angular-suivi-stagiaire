import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Logger } from 'src/app/core/helpers/logger';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class HasUserGuard implements CanActivate {
  public constructor(
    private userService: UserService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.isAuthenticated()) {
      // Mean that a User was authenticated, so, don't allow to go to SigninComponent
      this.router.navigate(['/', 'interns']);
      return false;
    }
    
    return true;
  }
  
}
