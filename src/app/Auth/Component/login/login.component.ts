import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLogInRespones, AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LogingToken!:AuthLogInRespones;

  isLoading = false;
  LogInerror:string =null!;


  constructor(private authService:AuthService, private router: Router) { }

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
        console.log(res);
        this.LogingToken = res;
        this.isLoading = false;
        this.authService.CurrentUserName.next(model.UserName)
        if (model.UserName==='Admin') {
          this.router.navigate(['/productAdmin'])
          return;
        }
        this.router.navigate(['/products'])
      },error=>{
        console.log(error);
        this.LogInerror = 'An error occured';
        this.isLoading = false;
      })

    form.reset();
  }




}
