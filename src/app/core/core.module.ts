import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    PageNotFoundComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  providers: [AuthGuard, NoAuthGuard],
  exports: [LayoutComponent]
})
export class CoreModule { }
