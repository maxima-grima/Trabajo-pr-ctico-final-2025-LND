import { inject, Injectable, signal } from '@angular/core';
import { product, NewProduct, DiscountData, HappyHourData } from '../interfaces/products';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  authService = inject(AuthService);
  readonly API_URL = "https://restaurant-api.somee.com/api";

  
  products = signal<product[]>([]);

  async getProductsByRestaurant(restaurantId: string) {
    const res = await fetch(`${this.API_URL}/Products/restaurant/${restaurantId}`);
    if (!res.ok) return;
    const data = await res.json();
    this.products.set(data);
  }

  async getProductById(id: string | number) {
    const res = await fetch(`${this.API_URL}/Products/${id}`);
    if (!res.ok) return undefined;
    return (await res.json()) as product;
  }



  async createProduct(product: NewProduct) {
    const res = await fetch(`${this.API_URL}/Products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
      body: JSON.stringify(product)
    });
    if (!res.ok) return undefined;
    const newProduct = (await res.json()) as product;
    this.products.update(current => [...current, newProduct]);
    return newProduct;
  }

  async updateProduct(product: product) {
    const res = await fetch(`${this.API_URL}/Products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
      body: JSON.stringify(product)
    });
    if (!res.ok) return undefined;
    this.products.update(current => 
      current.map(p => p.id === product.id ? product : p)
    );
    return product;
  }

  async deleteProduct(id: string | number) {
    const res = await fetch(`${this.API_URL}/Products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${this.authService.token}` }
    });
    if (!res.ok) return false;
    this.products.update(current => current.filter(p => p.id !== id));
    return true;
  }

  

  async setDiscount(id: string | number, discountData: DiscountData) {
    const res = await fetch(`${this.API_URL}/Products/discount/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
      body: JSON.stringify(discountData)
    });
    return res.ok;
  }

  async setHappyHour(id: string | number, happyHourData: HappyHourData) {
     const res = await fetch(`${this.API_URL}/Products/happyhour/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
      body: JSON.stringify(happyHourData)
    });
    return res.ok;
  }
}
