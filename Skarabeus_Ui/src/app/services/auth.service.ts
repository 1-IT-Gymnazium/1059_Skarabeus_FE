import { LoginModel, PasswordResetModel, TokenModel } from '../models/auth.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserDetail } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api/v1/Auth';
  private readonly router = inject(Router);
  private readonly httpClient = inject(HttpClient);
  private userInfoModel = new ReplaySubject<UserDetail|null>(1);
  userInfoModel$ = this.userInfoModel.asObservable();

  constructor(){
    this.userInfo()
  }

  login(data: LoginModel): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/Login`, data).pipe(
      tap((response) => {
        this.httpClient
        .get<UserDetail>(`${this.baseUrl}`,{})
        .subscribe({
          next:(x)=>{
            this.userInfoModel.next(x)
            this.router.navigate(['/']);
          }
        })
        return response;
      })
    );
  }

  logout(): void {
    this.httpClient
      .post(`${this.baseUrl}/Logout`, {})
      .subscribe((res) => {
        this.userInfo()
        this.router.navigate(['/login']);
        return res;
      });
  }

  userInfo(){
    return this.httpClient
    .get<UserDetail>(`${this.baseUrl}`,{})
    .subscribe({
      next:(x)=>{
        this.userInfoModel.next(x)
      },
      error:(err)=>{
        this.userInfoModel.next(null);
      }
    });
  }

  validateEmail(model:TokenModel){
    return this.httpClient.post(`${this.baseUrl}/validateEmail`,model)
  }

  changePassword(model:PasswordResetModel){
    return this.httpClient.post(`${this.baseUrl}/ChangePassword`,model)
  }
}
