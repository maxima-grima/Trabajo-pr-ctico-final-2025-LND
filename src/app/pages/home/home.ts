import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users-service';
import { RouterModule } from '@angular/router';
import { UsersListItem } from '../../Components/users-list-item/users-list-item';
@Component({
  selector: 'app-home',
  imports: [UsersListItem, RouterModule,],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  usersService = inject(UsersService)
  ngOnInit(): void {
    this.usersService.getUsers();
  }


}

