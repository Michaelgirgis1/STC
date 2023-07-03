import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service'
import { LanguageService } from '../../../core/services/language.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  lang!: string
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService,   private _LangService: LanguageService) {
    this._LangService.lang.subscribe((res) => {
      this.lang = res
    })
   }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }

  logout() {
   this.authService.logout()
   this.isAuthenticated = this.authService.isAuthenticated()
  }

    //change language of site
    changeLang(type: string) {
      localStorage.setItem('lang', 'en');
      this._LangService.changeLanguage(type)
    }
}
