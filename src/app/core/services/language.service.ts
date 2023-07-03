import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  lang = new BehaviorSubject<string>(' ');
  body: any = document.body;
  constructor(public translate: TranslateService) {
    this.getCurrentLang();
  }

  getCurrentLang() {
    let lang = localStorage.getItem('langauge');
    if (lang == 'en' || lang == null) {
      this.translate.setDefaultLang('en');
      localStorage.setItem('langauge', 'en');
      this.translate.use('en');
      this.lang.next('en');
      this.body.classList.add("ltr");
      this.body.classList.remove("rtl");
    } else {
      this.translate.setDefaultLang('ar');
      localStorage.setItem('langauge', 'ar');
      this.translate.use('ar');
      this.lang.next('ar');
      this.body.classList.add("rtl");
      this.body.classList.remove("ltr");
    }
  }

  changeLanguage(type: string) {
    this.translate.setDefaultLang(type);
    localStorage.setItem('langauge', type);
    this.translate.use(type);
    this.lang.next(type);
    if (type == 'ar') {
      this.body.classList.add("rtl");
      this.body.classList.remove("ltr");
    } else {
      this.body.classList.add("ltr");
      this.body.classList.remove("rtl");
    }
  }
}
