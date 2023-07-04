import { Component } from '@angular/core';
import {AppRouter} from "../../../shared/services/router";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  constructor(private appRouter: AppRouter,

    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Not Found');

  }
  back() {
   this.appRouter.goToLoginPage()
  }
}
