import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users-service';


@Component({
  selector: 'app-register-page',
  imports: [RouterModule, FormsModule,],
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
      !form.value.address ||
      !form.value.phoneNumber ||
      form.value.password !== form.value.password2) {
      this.errorRegister = true;
      return
    }
    
    this.isLoading = true;
    const user = await this.usersService.createUser(form.value);
    this.isLoading = false;

    if (!user) {
      this.errorRegister = true;
    } else {
      this.errorRegister = false
      this.router.navigate(["/login"])
    }
  }
}