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
    if(this.idRestaurant()){
      this.restaurant = this.usersService.users.find(restaurant => restaurant.id.toString() === this.idRestaurant());
      if(!this.restaurant) this.cargandoRestaurante = true;
      const res = await this.usersService.getUsersbyId(this.idRestaurant());
      if(res) this.restaurant = res;
      this.cargandoRestaurante = false;
    }
  }
}
