import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'flowbite';
 
@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,AsyncPipe],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent {
  authService=inject(AuthService)

  protected user$ = this.authService.userInfoModel$;

  constructor() {    
  }

  dropdownVisible = false;
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }
  
  refresh(){
    this.authService.userInfo();
  }

  logout() {
    this.authService.logout()
    this.dropdownVisible = false
    this.refresh()
  }
}
