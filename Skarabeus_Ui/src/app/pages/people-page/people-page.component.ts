import { Component, OnInit } from '@angular/core';
import { PersonsListComponent } from "../../components/persons-list/persons-list.component";
import { UserListComponent } from "../../components/user-list/user-list.component";
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-people-page',
  standalone:true,
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss'],
  imports: [PersonsListComponent, UserListComponent,AsyncPipe]
})
export class PeoplePageComponent{

  role$=this.authService.role$

  constructor(private authService:AuthService) { }
}
