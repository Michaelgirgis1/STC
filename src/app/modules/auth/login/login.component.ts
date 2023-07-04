import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';

import {AppRouter} from "../../../shared/services/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup | undefined;
  errorMessage: string = '';
  private readonly AUTH_KEY = 'is_authenticated';
  private readonly ROLE_KEY = 'user_role';
  constructor( private authService: AuthService, private appRouter: AppRouter,
    private titleService: Title,
    private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.titleService.setTitle('Login');

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const { username, password } = this.loginForm?.value;
    this.authService.login(username, password)

    this.errorMessage = '';
    this.authService.login( username, password).subscribe(
      (isAuthenticated: boolean) => {

        if (isAuthenticated) {
          if (this.authService.isAdminUser()) {
            this.appRouter.goToAdminPage()
          } else {
            this.appRouter.goToUserPage()
          }
        } else {
          this.errorMessage = 'Invalid username or password.';
        }
      },
      (error: any) => {
        this.errorMessage = 'Invalid username or password.';
        console.error('Error during login:', error);
      }
    );

  }

}
