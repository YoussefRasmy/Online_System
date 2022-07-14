import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {  AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {




  isLoading = false;


  RegestErerror:string =null!;

  constructor(private authService:AuthService, private router: Router) { }

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
      },(error)=>{
        this.isLoading = false;
        console.log(error);
        if (error.status==200) {
          this.onSwitchMode()
          return;
        }
        this.RegestErerror = error.error;

      })
    //form.reset();
  }




}
