import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthLogInRespones, AuthService } from '../../service/auth.service';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LogingToken!:AuthLogInRespones;

  isLoading = false;
  LogInerror:string =null!;


  constructor(public translate:TranslateService,private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){

    this.LogInerror =null!;

    this.router.navigate(['/signup'])
  }



  onLogInFormSubmit(form:NgForm){
    console.log({logIn:form.value});
    if(!form.valid){
      return;
    }
    let model =
      {
        UserName : form.value.userName,
        Password : form.value.password
      }
      localStorage.setItem("userName", model.UserName);
//console.log(model);
      this.isLoading = true;
      this.authService.Login(model).subscribe((res:AuthLogInRespones)=>{
        const token = this.authService.getDecodedAccessToken(res.token)

        // console.log({TOKEN:token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]});

       const userRole = token["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        console.log(res);
        this.LogingToken = res;
        this.isLoading = false;
        this.authService.CurrentUserName.next(model.UserName)
        //this.authService.CurrentUserRole.next(userRole)
        if (userRole==='Admin') {
          this.router.navigate(['/productAdmin'])
          return;
        }
        this.router.navigate(['/products'])
      },error=>{
        console.log(error);
        this.LogInerror = error.error
        this.isLoading = false;
      })

    form.reset();
  }




}
