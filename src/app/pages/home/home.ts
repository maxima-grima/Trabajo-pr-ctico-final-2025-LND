import { Component, inject } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
<<<<<<< HEAD
import { UsersService } from '../../SERVICE/users-service';
import { User } from '../../interfaces/user';
import { UsersListItem } from '../../Components/users-list-item/users-list-item';
=======
import { UsersService } from '../../services/users-service';
import { User } from '../../interfaces/user';
import { UsersListItem } from '../../components/users-list-item/users-list-item';
>>>>>>> f77fbf4d7b262dc19987e6946bffc4d76af16701
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [UsersListItem, RouterModule, ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
usersService = inject (UsersService)

}
