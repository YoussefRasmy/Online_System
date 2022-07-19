import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './Auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Online_System';

  constructor(private authService:AuthService,public translate:TranslateService){}




  ngOnInit(): void {
    this.authService.autoLogin()

  }
}
