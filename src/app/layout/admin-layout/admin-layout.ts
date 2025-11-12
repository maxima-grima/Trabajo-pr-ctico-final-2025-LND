import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-admin-layout',
  imports: [],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {
  authService = inject(AuthService);
}
