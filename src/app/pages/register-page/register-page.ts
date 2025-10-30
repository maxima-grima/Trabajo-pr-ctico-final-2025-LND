import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { UsersService } from '../../SERVICE/users-service';
import { Spinner } from '../../Components/spinner/spinner';
=======
import { UsersService } from '../../services/users-service';
import { Spinner } from '../../components/spinner/spinner';
>>>>>>> f77fbf4d7b262dc19987e6946bffc4d76af16701


@Component({
  selector: 'app-register-page',
  imports: [RouterModule, FormsModule, Spinner],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})


export class RegisterPage {
  errorRegister = false;
  usersService = inject(UsersService);
  isLoading = false;
  router = inject(Router);

  async register(form: NgForm) {
    this.errorRegister = false;
    if (!form.value.restaurantName ||
      !form.value.password ||
      !form.value.password2 ||
      !form.value.firstName ||
      !form.value.lastName ||
      !form.value.adress ||
      !form.value.phoneNumber ||
      form.value.password !== form.value.password2) {
      this.errorRegister = true;
      return
    }
  }
}