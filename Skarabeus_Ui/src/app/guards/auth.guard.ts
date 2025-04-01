import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'; // Adjust the import path if needed

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.userInfoModel$.pipe(
      take(1),  // Only take the first emitted value from the observable
      switchMap(user => {
        if (user) {
          // User info is available, user is authenticated
          return of(true);
        } else {
          // User info is not available, meaning not authenticated
          this.router.navigate(['/login']);
          return of(false);
        }
      }),
      catchError((err) => {
        // In case of error (e.g., network error or other issue), redirect to login
        console.error('AuthGuard Error: ', err);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
