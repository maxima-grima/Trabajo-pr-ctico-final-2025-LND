import { Component, OnInit, input,inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { User } from '../interfaces/user';
import { UsersService } from '../services/users-service';

@Component({
  selector: 'app-restaurant-details-page',
  imports: [RouterLink],
  templateUrl: './restaurant-details-page.html',
  styleUrl: './restaurant-details-page.scss'
})
export class RestaurantDetailsPage implements OnInit{
  usersService = inject(UsersService)
  restaurant: User | undefined;
  idRestaurant = input.required<string>()
  cargandoRestaurante = false;
  router = inject (Router)
  async ngOnInit() {
    this.restaurant = await this.usersService.getUsersbyId(this.idRestaurant());
  
  }
}
