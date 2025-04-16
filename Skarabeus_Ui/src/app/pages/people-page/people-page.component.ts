import { Component, OnInit } from '@angular/core';
import { PersonsListComponent } from "../../components/persons-list/persons-list.component";
import { UserListComponent } from "../../components/user-list/user-list.component";
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

/**
 * this page puts together person-list and user-list. 
 * 
 * user-list is displayed only to administrators
 */
@Component({
  selector: 'app-people-page',
  standalone:true,
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss'],
  imports: [PersonsListComponent, UserListComponent,AsyncPipe]
})
export class PeoplePageComponent{

  protected user$ = this.authService.userInfoModel$;

  constructor(private authService:AuthService) { }
}
