import { Component, inject, input } from '@angular/core';
import { UsersService } from '../../services/users-service';
import { User } from '../../interfaces/user';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [RouterModule, RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
  usersService = inject(UsersService);
  isLoading = false;
  router = inject(Router);
  errorBack=false;

  user: User | undefined; 
  id = input<number>();

  async handleFormSubmission(form: NgForm) {
    
    this.errorBack = false;
    const editUSer: User = {
      id: this.user?.id,
      restaurantName: form.value.restaurantName,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      phoneNumber: form.value.phoneNumber, 
      password: form.value.password, 
    };
  }
}
