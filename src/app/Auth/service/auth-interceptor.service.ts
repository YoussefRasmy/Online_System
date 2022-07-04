import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable,take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.user.pipe(
      take(1),
      exhaustMap((user)=>{
        if (!user) {
          console.log("there is no user");

          return next.handle(req);
        }

        /*
        {headers: new HttpHeaders(
          {
            'Authorization': `Bearer ${my_token}`,
            'Content-Type': 'application/json'
          })}
        */
        const modifiedReq = req.clone({headers: new HttpHeaders(
          {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          })})
          console.log({Tokenreq:user.token});

        return next.handle(modifiedReq)
      })
    )


  }
}
