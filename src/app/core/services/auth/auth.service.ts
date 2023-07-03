
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {AppRouter} from "../../../shared/services/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAdmin: boolean = false;
  private readonly AUTH_KEY = 'is_authenticated';
  private readonly ROLE_KEY = 'user_role';


  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private appRouter: AppRouter) {}

  login(username: string, password: string): Observable<boolean>  {

    return new Observable<boolean>((observer) => {
      if (username === 'user' && password === 'user') {
        this.isAuthenticatedSubject.next(true);
        this.isAdmin = false;
        localStorage.setItem(this.AUTH_KEY, 'true');
        localStorage.setItem(this.ROLE_KEY, 'user');
        observer.next(true);
        observer.complete();
      } else if (username === 'admin' && password === 'admin') {
        this.isAuthenticatedSubject.next(true);
        this.isAdmin = true;
        localStorage.setItem(this.AUTH_KEY, 'true');
        localStorage.setItem(this.ROLE_KEY, 'admin');
        observer.next(true);
        observer.complete();
      }  else {
        this.isAuthenticatedSubject.next(false);
        localStorage.setItem(this.AUTH_KEY, 'false');
        observer.error('Invalid username or password');
      }
    })
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    this.appRouter.goToLoginPage()
  }
  getUserRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  isAuthenticated(): boolean {
    const isAuthenticated = localStorage.getItem('is_authenticated') === 'true';
    this.isAuthenticatedSubject.next(isAuthenticated);
    return isAuthenticated;
  }
  isAdminUser(): boolean {
    const role = this.getUserRole();
    return role === 'admin';
  }
}
