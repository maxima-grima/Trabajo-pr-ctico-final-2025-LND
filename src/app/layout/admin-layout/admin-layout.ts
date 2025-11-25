import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {
  authService = inject(AuthService);
  showLogOutConfirm = false;
  isLogingOut = false;
  error = '';

  openLogOutConfirm() {
    this.showLogOutConfirm = true;
  }

  closeLogOutConfirm() {
    this.showLogOutConfirm = false;
  }

  async logOutUser() {

    this.isLogingOut = true;

    try {
      this.authService.logout();
    
    } catch (err) {
      this.error = 'Error al cerrar sesión';
      this.showLogOutConfirm = false;
      this.isLogingOut = false;
    }
  }
}
