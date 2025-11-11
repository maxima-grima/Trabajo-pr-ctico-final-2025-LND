import { Component, OnInit, input,inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { User } from '../interfaces/user';
import { UsersService } from '../services/users-service';
import { ProductsService } from '../services/product-service';
import { CategoriesService } from '../services/category-service-';

@Component({
  selector: 'app-restaurant-details-page',
  imports: [RouterLink],
  templateUrl: './restaurant-details-page.html',
  styleUrl: './restaurant-details-page.scss'
})
export class RestaurantDetailsPage implements OnInit{
  usersService = inject(UsersService)
  restaurant: User | undefined = undefined;
  idRestaurant = input<string>();
  productsService = inject(ProductsService);
  categoriesService = inject(CategoriesService)
  cargandoInfo = false;
  products = this.productsService.products;
  categories = this.categoriesService.categories;
  async ngOnInit() {
    const restaurantId = this.idRestaurant();
    if((restaurantId)){
      this.cargandoInfo = true;
      this.restaurant = this.usersService.users.find(r => r.id.toString() === restaurantId);
      if(!this.restaurant) {
        this.restaurant = await this.usersService.getUsersbyId(restaurantId);
      }
        await this.productsService.getProductsByRestaurant(restaurantId);      
      await this.categoriesService.getCategoriesByRestaurant(restaurantId);
      this.cargandoInfo = false;
    }
  }

  getCategoryName(categoryId: number): string {
    return this.categories().find(c => c.id === categoryId)?.name ?? 'Sin Categoría';
  }
}
