import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';



@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule,],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})

export class LoginPage {

  errorLogin = false;
  authService = inject(AuthService);
  isLoading = false;
  router = inject(Router);

  async login(form: any) {
    console.log(form.value)

    this.errorLogin = false;

    if (!form.value.restaurantName || !form.value.password) {
      this.errorLogin = true;  
      return
    }
    
    this.isLoading = true;
    const success = await this.authService.login(form.value);
    this.isLoading = false;
    
    if (success) {
      this.router.navigate(["/admin"])
    }
    
    this.errorLogin = true;
  }
}