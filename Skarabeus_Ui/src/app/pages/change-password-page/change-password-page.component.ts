import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PasswordResetModel, TokenModel } from '../../models/auth.interface';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


/**
 * This page tests to validate email if the route contains emailToken, and then uses passwordToken to change users password
 */
@Component({
  selector: 'app-change-password-page',
  standalone:true,
  imports:[ReactiveFormsModule,FormsModule],
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss']
})
export class ChangePasswordPageComponent implements OnInit {
  lastError$:any;
  private readonly authService = inject(AuthService);
  private readonly route=inject(ActivatedRoute);
  private readonly router=inject(Router);

  model = {} as PasswordResetModel
  passwordCheck: string = '';
  passwordMismatch: boolean = false;

  acountCreation=false;

  constructor() { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      if(params.get("Email")&&params.get("Token")){
        this.acountCreation = true
        this.authService.validateEmail({email:params.get("Email")!,token:params.get("Token")!}).subscribe(
          {
            next:()=>{

            },
            error:(error: any)=>{
              this.lastError$=error.error
              console.log(this.lastError$)
            }
          }
        )
      }
        this.model.token = params.get("PasswordToken")!
        this.model.email = params.get("Email")!
    });
  }

  tryValidate(form:NgForm){
    if (form.invalid||this.passwordMismatch) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      this.checkPasswords()
    }
    else{
      this.changePassword()
    }
  }

  changePassword(){
    this.authService.changePassword(this.model).subscribe(
      {
        next:()=>{
          this.router.navigate(['/login'])
        },
        error:(err)=>{
          this.lastError$=err.error
        }
      }
    )
  }

  checkPasswords() {
    this.passwordMismatch = (this.model.password !== this.passwordCheck) || (this.model.password == "");
  }
}
