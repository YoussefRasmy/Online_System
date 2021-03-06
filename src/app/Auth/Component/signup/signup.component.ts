import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {  AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit ,OnDestroy {




  isLoading = false;


  RegestErerror:string =null!;

  constructor(private authService:AuthService, private router: Router,public translate:TranslateService) { }
  ngOnDestroy(): void {


  }

  ngOnInit(): void {
  }

  onSwitchMode(){
   this.router.navigate(['/login'])

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

        if (error.status==200||error.status == 201) {
          this.onSwitchMode()
          return;
        }
        this.RegestErerror = error.error;

      })
    //form.reset();
  }




}
