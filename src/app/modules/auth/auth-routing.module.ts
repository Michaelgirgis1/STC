import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from '../../core//guards/no-auth.guard'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [NoAuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
