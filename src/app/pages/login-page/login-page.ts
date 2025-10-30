import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
import { AuthService } from '../../SERVICE/auth-service';
import { Spinner } from '../../Components/spinner/spinner';
=======
import { AuthService } from '../../services/auth-service';
import { Spinner } from '../../components/spinner/spinner';
>>>>>>> f77fbf4d7b262dc19987e6946bffc4d76af16701



@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule, Spinner],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})

export class LoginPage {

  errorLogin = false;
  authService = inject(AuthService);
  isLoading = false;

  async login(form: any) {
    console.log(form.value)
    this.errorLogin = false;
    if (!form.value.email || !form.value.password) {
      this.errorLogin = true;
      return
    }
    this.isLoading = true;
    await this.authService.login(form.value);
    this.isLoading = false;
    this.errorLogin = true;
  }
}