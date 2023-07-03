import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

@NgModule({
  declarations: [
    NavbarComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [AuthGuard, NoAuthGuard]
})
export class CoreModule { }
