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
  dropdownVisible = false;

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  protected user$ = this.authService.userInfoModel$;
  
  refresh(){
    this.authService.userInfo();
  }

  logout() {
    this.authService.logout()
    this.dropdownVisible = false
    this.refresh()
  }
}
