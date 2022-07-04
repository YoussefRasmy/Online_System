import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap } from 'rxjs';
import {  throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user.model';

export interface AuthLogInRespones{
        token : string,
				expiryDate: Date
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null!);
  private tokenExpirationTimer:any;
  constructor(private http:HttpClient,private router:Router) { }
//Register
  Signup(model:any){
    return this.http.post(environment.baseApi+'User/regester', model)
  }


  Logout(){
    this.user.next(null!)
    this.router.navigate(["/auth"])
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }//ExpirationDate
  autoLogout(expirationDuration:number){
    //console.log(expirationDuration);

   this.tokenExpirationTimer = setTimeout(()=>{
      this.Logout();
      }, expirationDuration
    )
  }


  Login(model:any){
    return this.http.post<AuthLogInRespones>(environment.baseApi+'User/login', model)
    .pipe(tap(res=>{
      console.log({LoginRes: res});//token is correct

      const expirationDate = new Date(res.expiryDate)//new Date(now.getTime() + expiresInDuration * 1000)
      const user = new User(res.token,expirationDate)
      console.log( {user: user});
      const expirationDuration  = expirationDate.getTime() -new Date().getTime() ;
      this.user.next(user);
      this.autoLogout(expirationDuration)
      localStorage.setItem("userData",JSON.stringify(user))
    }))
  }

  autoLogin(){
    const userData:{
      _token : string,
				_tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData')!);
    if(!userData){
      return;
    }
    const loadedUser = new User(userData._token,new Date(userData._tokenExpirationDate))
    if(loadedUser.token){
      const expirationDuration  = new Date(userData._tokenExpirationDate).getTime() -new Date().getTime() ;
      this.user.next(loadedUser);
      this.autoLogout(expirationDuration)
    }
  }
}
