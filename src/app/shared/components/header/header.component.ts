import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated = false;
  isAdmin = false;
  private userSub!: Subscription;
  constructor(private authService:AuthService) { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;

    })
    this.authService.CurrentUserName.subscribe(userName=>{
      if(userName !=null){
        this.isAdmin = userName === 'Admin'
        return;
      }
      var localUserName = localStorage.getItem("userName")!;
      this.isAdmin = localUserName === 'Admin'

    })





  }



  onLogOut(){
    this.authService.Logout()
  }


}
