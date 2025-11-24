import { Component, OnInit, input, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users-service';
import { ProductsService } from '../../services/product-service';
import { CategoriesService } from '../../services/category-service';
import { Product } from '../../interfaces/products';

@Component({
  selector: 'app-restaurant-details-page',
  imports: [RouterLink, CommonModule],
  templateUrl: './restaurant-details-page.html',
  styleUrl: './restaurant-details-page.scss'
})
export class RestaurantDetailsPage implements OnInit {
  usersService = inject(UsersService);
  restaurant: User | undefined = undefined;
  idRestaurant = input<number>();
  productsService = inject(ProductsService);
  categoriesService = inject(CategoriesService);
  cargandoInfo = false;
  products = this.productsService.products;
  categories = this.categoriesService.categories;
  selectedCategoryId = signal<number | null>(null);

  async ngOnInit() {
    const restaurantId = this.idRestaurant();
    if (restaurantId) {
      this.cargandoInfo = true;
      this.restaurant = this.usersService.users.find(r => r.id === restaurantId);
      if (!this.restaurant) {
        this.restaurant = await this.usersService.getUsersbyId(restaurantId);
      }
      await this.productsService.getProductsByRestaurant(restaurantId);
      await this.categoriesService.getCategoriesByRestaurant(restaurantId);
      
      // Seleccionar primera categoría por defecto
      if (this.categories().length > 0) {
        this.selectedCategoryId.set(this.categories()[0].id);
      }
      
      this.cargandoInfo = false;
    }
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId.set(categoryId);
  }

  getFilteredProducts(): Product[] {
    const selectedId = this.selectedCategoryId();
    if (selectedId === null) {
      return this.products();
    }
    return this.products().filter(p => p.categoryId === selectedId);
  }

  getFinalPrice(product: Product): number {
    if (!product.discount || product.discount === 0) {
      return product.price;
    }
    return product.price - (product.price * (product.discount / 100));
  }
}