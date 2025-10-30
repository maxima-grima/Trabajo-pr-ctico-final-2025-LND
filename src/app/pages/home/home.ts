import { Component, inject } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UsersService } from '../../services/users-service';
import { User } from '../../interfaces/user';
import { UsersListItem } from '../../components/users-list-item/users-list-item';
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
