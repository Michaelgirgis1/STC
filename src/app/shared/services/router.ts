import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppRouter {
  constructor(private router: Router) {}

  goToAdminPage(): void {
    this.router.navigate(['/admin']);
  }
  goToUserPage(): void {
    this.router.navigate(['/user']);
  }

  goToLoginPage(): void {
    this.router.navigate(['/login']);
  }

  goToHomePage(): void {
    this.router.navigate(['/']);
  }
}
