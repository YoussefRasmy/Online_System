import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap } from 'rxjs';
import {  throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user.model';
import jwt_decode from 'jwt-decode';

export interface AuthLogInRespones{
        token : string,
				expiryDate: Date
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null!);

  CurrentUserName = new BehaviorSubject<string>(null!);

 // CurrentUserRole = new BehaviorSubject<string>(null!);

  private tokenExpirationTimer:any;
  constructor(private http:HttpClient,private router:Router) { }
//Register

  Signup(model:any){
    return this.http.post(environment.baseApi+'User/regester', model)
  }

  Login(model:any){
    return this.http.post<AuthLogInRespones>(environment.baseApi+'User/login', model)
    .pipe(tap(res=>{


      const expirationDate = new Date(res.expiryDate)

      const tokenDecoded = this.getDecodedAccessToken(res.token)
      const userRole = tokenDecoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      const user = new User(res.token,expirationDate,userRole)



      const expirationDuration  = expirationDate.getTime() -new Date().getTime();

      this.user.next(user);

      this.autoLogout(expirationDuration)

      localStorage.setItem("userData",JSON.stringify(user))


    }))
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }




  Logout(){
    this.user.next(null!)
    this.router.navigate(["/login"])
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }//ExpirationDate
  
  autoLogout(expirationDuration:number){


   this.tokenExpirationTimer = setTimeout(()=>{
      this.Logout();
      }, expirationDuration
    )
  }



  autoLogin(){
    const userData:{
      _token : string,
			_tokenExpirationDate: string,
      _role:string
    } = JSON.parse(localStorage.getItem('userData')!);
    if(!userData){
      return;
    }
    const loadedUser = new User(userData._token,new Date(userData._tokenExpirationDate),userData._role)
    if(loadedUser.token){
      const expirationDuration  = new Date(userData._tokenExpirationDate).getTime() -new Date().getTime() ;
      this.user.next(loadedUser);
      this.autoLogout(expirationDuration)

    }
  }
}
