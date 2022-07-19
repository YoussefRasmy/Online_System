import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take,tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.user.pipe(
        take(1),
        map(user=>{
          //console.log("helloooowwwwo");

          return user.role ==='Admin'
        }),
        tap(isAdmin=>{
          if (!isAdmin) {

           // console.log({AuthAdmin:isAdmin});

            this.router.navigate(["/products"])

          }
        })
      )




    return true;
  }

}