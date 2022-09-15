import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class HasUserGuard implements CanActivate {
  public constructor(
    private userService: UserService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.userService.isAuthenticated()) {
      // Mean that a User was authenticated, so, don't allow to go to SigninComponent
      return false;
    }
    
    return true;
  }
  
}