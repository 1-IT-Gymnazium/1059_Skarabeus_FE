import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TokenModel } from '../../models/auth.interface';

/**
 * this page validates users email using token provided in route
 */
@Component({
  selector: 'app-validateEmail-page',
  standalone:true,
  imports:[RouterLink],
  templateUrl: './validate-email-page.component.html',
  styleUrls: ['./validate-email-page.component.scss']
})
export class ValidateEmailPageComponent implements OnInit {
  lastError$:any;
  private readonly authService = inject(AuthService);
  route=inject(ActivatedRoute);


  constructor() { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {

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
  });
    
  }

}
