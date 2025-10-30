import { Component, inject, input } from '@angular/core';
import { User } from '../../interfaces/user';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
import { UsersService } from '../../SERVICE/users-service';
=======
import { UsersService } from '../../services/users-service';
>>>>>>> f77fbf4d7b262dc19987e6946bffc4d76af16701

@Component({
  selector: 'app-users-list-item',
  imports: [RouterModule],
  templateUrl: './users-list-item.html',
  styleUrl: './users-list-item.scss'
})
export class UsersListItem {
usersService = inject (UsersService)
user= input.required<User>()
}
