import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLogInRespones, AuthService } from '../service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  LogingToken!:AuthLogInRespones;
  isLoginMode:boolean = false;
  isLoading = false;
  LogInerror:string =null!;

  RegestErerror:string =null!;
  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
    this.LogInerror =null!;

    this.RegestErerror =null!;
  }

  onRegisterFormSubmit(form:NgForm){
    if(!form.valid){
      return;
    }

    let model =
      {
        username : form.value.userName,
        password : form.value.password,
        email : form.value.email,
        address : form.value.address,
        firstName : form.value.firstName,
        lastName : form.value.lastName,
      }

      this.isLoading = true;
      this.authService.Signup(model).subscribe(res=>{

        this.isLoading = false;
        this.onSwitchMode();
      },(error)=>{
        this.isLoading = false;

        if (error.status==200) {
          this.onSwitchMode()
          return;
        }
        this.RegestErerror = error.error;

      })
    //form.reset();
  }

  onLogInFormSubmit(form:NgForm){

    if(!form.valid){
      return;
    }
    let model =
      {
        UserName : form.value.userName,
        Password : form.value.password
      }
      localStorage.setItem("userName", model.UserName);

      this.isLoading = true;
      this.authService.Login(model).subscribe((res:AuthLogInRespones)=>{

        this.LogingToken = res;
        this.isLoading = false;
        this.authService.CurrentUserName.next(model.UserName)
        if (model.UserName==='Admin') {
          this.router.navigate(['/productAdmin'])
          return;
        }
        this.router.navigate(['/products'])
      },error=>{

        this.LogInerror = 'An error occured';
        this.isLoading = false;
      })

    form.reset();
  }





}
