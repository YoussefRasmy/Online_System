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
  private userSub!: Subscription;
  constructor(private authService:AuthService) { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;

    })
    

  }



  onLogOut(){
    this.authService.Logout()
  }


}
