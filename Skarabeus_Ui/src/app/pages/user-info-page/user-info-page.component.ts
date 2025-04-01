import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetail, UserPatch } from '../../models/user.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditService } from '../../services/Edit.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-info-page',
  standalone:true,
  templateUrl: './user-info-page.component.html',
  imports:[FormsModule,ReactiveFormsModule],
  styleUrls: ['./user-info-page.component.scss']
})
export class UserInfoPageComponent implements OnInit {
  userService = inject(UserService)
  authService = inject(AuthService);
  editService = inject(EditService);
  router = inject(Router);

  user = {} as UserDetail;
  userUpdateBase = {} as UserDetail;

  constructor() {
    this.authService.userInfoModel$.subscribe(x=>this.user = x!)
  }

  ngOnInit() {
  }

  openPersonEdit(){
    this.editService.openPersonEditModal(this.user.person.id, this.router.url)
    this.router.navigate(['/people'])
  }

    updateField(field: string) {
      const patch: Partial<UserPatch> = {};
      
      if ((this.userUpdateBase as any)[field] !== (this.user as any)[field]) {
        (patch as any)[field] = (this.user as any)[field];
        this.userService.Patch(this.user.id, patch)
        .subscribe(() => this.authService.userInfo())
      }
    }
        
    
    onBlur(field: string, isValid?: boolean) {
      console.log(isValid,field)
      if (isValid) {
        this.updateField(field);
      }
    }

}
