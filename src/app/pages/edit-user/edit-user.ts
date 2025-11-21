import { Component, inject, input, viewChild } from '@angular/core';
import { UsersService } from '../../services/users-service';
import { NewUser, User } from '../../interfaces/user';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-settings',
  imports: [RouterModule, FormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss'
})
export class EditUser {
  usersService = inject(UsersService);
  authService = inject(AuthService);
  cargando = false;
  userOriginal: User | undefined = undefined;
  error: string | null = null;
  success: boolean = false;
  showDeleteConfirm: boolean = false;
  isLoading = false;
  router = inject(Router);
  errorBack = false;
  form = viewChild<NgForm>('editUserForm');
  idUser = input<number>();

  async ngOnInit() {
    if(this.idUser()){
        this.userOriginal = await this.usersService.getUsersbyId(this.idUser()!)
        this.form()?.setValue({
          firstName: this.userOriginal!.firstName,
          lastName: this.userOriginal!.lastName,
          address: this.userOriginal!.address,
          restaurantName: this.userOriginal!.restaurantName,
          password: this.userOriginal!.password,
          phoneNumber: this.userOriginal!.phoneNumber,        
        })
      }
  }
  async handleFormSubmission(form: NgForm) {

    this.errorBack = false;
    const editUSer: User = {
      id: this.userOriginal?.id as number,
      restaurantName: form.value.restaurantName,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      phoneNumber: form.value.phoneNumber,
      password: form.value.password  || this.userOriginal?.password,
    };
    let res;
    this.isLoading = true
    if(this.idUser()){
      res = await this.usersService.updateUser({...editUSer, id:this.idUser()!});
    }
    this.isLoading = false; 
    if(!res){
      this.errorBack = true; 
      return
    };
    this.router.navigate(["/"]);
  
  }

}
