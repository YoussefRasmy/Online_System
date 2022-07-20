import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-slider',
  templateUrl: './language-slider.component.html',
  styleUrls: ['./language-slider.component.scss']
})
export class LanguageSliderComponent implements OnInit ,OnDestroy{
lang = 'en'
  constructor(public translate:TranslateService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {

    if (this.lang==='en') {
      return;
    }
    this.changeLang()
  }




  changeLang(){
    this.lang = this.lang==='en'?'ar':'en';
    this.translate.use(this.lang)


   }

}
