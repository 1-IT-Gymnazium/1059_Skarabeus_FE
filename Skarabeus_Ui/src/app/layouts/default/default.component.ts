import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Dropdown } from 'flowbite';
 
@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,AsyncPipe],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent {
  constructor(private authService:AuthService) {
    
  }
  drop!:Dropdown
  
  protected user$ = this.authService.userInfoModel$;
  
  logout() {
    this.authService.logout();
  }
}
