import { LoginModel } from '../models/users/login.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserInfoModel } from '../models/users/user-info-model.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api/v1/Auth';
  private readonly router = inject(Router);
  private readonly httpClient = inject(HttpClient);
  private userInfoModel = new ReplaySubject<UserInfoModel>(1);
  userInfoModel$ = this.userInfoModel.asObservable();
  
  protected role = new BehaviorSubject<string>("");
  role$ = this.role.asObservable()


  /*
  private isLoggedInSubject = new ReplaySubject<boolean>(1);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
*/

  constructor(){
    this.userInfo()
    this.getRole()
  }

  getRole(){
    this.httpClient
    .get<string>(`${this.baseUrl}/GetRole`, { responseType: 'text' as 'json' })
    .subscribe(x=>{this.role.next(x);console.log(x)}
    )
  }

  login(data: LoginModel): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/Login`, data).pipe(
      tap((response) => {
        this.router.navigate(['/home']);
        this.userInfo();
        return response;
      })
    );
  }
/*
  refreshToken(): Observable<string> {
    return this.httpClient
      .post<{ token: string }>(`${this.baseUrl}/Refresh`, {}).pipe(
        map((response) => {
          const newAccessToken = response.token;
          localStorage.setItem('accessToken', newAccessToken);
          return newAccessToken;
        })
      );
  }
*/
  logout(): void {
    this.httpClient
      .post(`${this.baseUrl}/Logout`, {})
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  userInfo(): void{
    this.httpClient
    .get<UserInfoModel>(`${this.baseUrl}`,{})
    .subscribe(us => this.userInfoModel.next(us));
  }
/*
  isAuthenticated(): boolean {
    let isAuthenticated = false;
    this.isLoggedInSubject
      .subscribe((status) => (isAuthenticated = status))
      .unsubscribe();
    return isAuthenticated;
  }
    */
}
