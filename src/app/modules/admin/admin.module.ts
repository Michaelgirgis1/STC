import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import {AdminRoutingModule } from './admin-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateAddProductComponent } from './components/update-add-product/update-add-product.component';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    AdminDashboardComponent,
    UpdateAddProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    MatInputModule,
    HttpClientModule
  ]
})
export class AdminModule { }
