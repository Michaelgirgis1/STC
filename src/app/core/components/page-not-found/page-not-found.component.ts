import { Component } from '@angular/core';
import {AppRouter} from "../../../shared/services/router";
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  constructor(private appRouter: AppRouter) { }

  ngOnInit(): void {
  }
  back() {
   this.appRouter.goToLoginPage()
  }
}
