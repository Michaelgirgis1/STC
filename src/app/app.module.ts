import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {CoreModule} from './core/core.module';
import {AdminModule} from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AdminModule,
    UserModule,
    SharedModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
