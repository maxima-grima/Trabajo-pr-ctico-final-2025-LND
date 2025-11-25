import { Component, inject, input } from '@angular/core';
import { User } from '../../interfaces/user';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-users-list-item',
  imports: [RouterModule],
  templateUrl: './users-list-item.html',
  styleUrl: './users-list-item.scss'
})
export class UsersListItem {
  usersService = inject(UsersService)
  user = input.required<User>()
}
