import { Component, inject } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UsersService } from '../../SERVICE/users-service';
import { User } from '../../interfaces/user';
import { UsersListItem } from '../../Components/users-list-item/users-list-item';
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
