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
    //console.log(form.value);
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
        console.log(res);
        this.isLoading = false;
        this.onSwitchMode();
      },error=>{
        console.log(error);

        this.RegestErerror = error.error;
        this.isLoading = false;
      })
    //form.reset();
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
//console.log(model);
      this.isLoading = true;
      this.authService.Login(model).subscribe((res:AuthLogInRespones)=>{
        console.log(res);
        this.LogingToken = res;
        this.isLoading = false;
        this.router.navigate(['/products'])
      },error=>{
        console.log(error);
        this.LogInerror = 'An error occured';
        this.isLoading = false;
      })

    form.reset();
  }





}
