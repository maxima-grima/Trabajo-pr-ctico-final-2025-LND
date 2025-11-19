import { inject, Injectable, signal } from '@angular/core';
import { Product, NewProduct, DiscountData, HappyHourData } from '../interfaces/products';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  authService = inject(AuthService);
  readonly API_USERS_URL = "https://w370351.ferozo.com/api/users";
  readonly API_PRODUCTS_URL = "https://w370351.ferozo.com/api/products";
  
  products = signal<Product[]>([]);

  async getProductsByRestaurant(restaurantId: number) {
    const res = await fetch(`${this.API_USERS_URL}/${restaurantId}/products`);
    if (!res.ok) return;
    const data = await res.json();
    this.products.set(data);
  }

  async getProductById(id: string | number) {
    const res = await fetch(`${this.API_PRODUCTS_URL}/${id}`);
    if (!res.ok) return undefined;
    return (await res.json()) as Product;
  }


async getMyProducts() {
     const res = await fetch(`${this.API_PRODUCTS_URL}/me`, {
       headers: { 'Authorization': `Bearer ${this.authService.token}` }
     });
     if (!res.ok) { this.products.set([]); return; };
     const data = await res.json();
     this.products.set(data);
    }
  async createProduct(product: NewProduct) {

    const res = await fetch(this.API_PRODUCTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`,
      },
      body: JSON.stringify(product)
    });
    if (!res.ok) return undefined;
    const newProduct = (await res.json()) as Product;
    this.products.update(current => [...current, newProduct]);
    return newProduct;
  }

  async updateProduct(product: Product) {
    const res = await fetch(`${this.API_PRODUCTS_URL}/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`,
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
    const res = await fetch(`${this.API_PRODUCTS_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${this.authService.token}` }
    });
    if (!res.ok) return false;
    this.products.update(current => current.filter(p => p.id !== id));
    return true;
  }

  

  async setDiscount(id: string | number, discountData: DiscountData) {
    const res = await fetch(`${this.API_PRODUCTS_URL}/${id}/discount`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
      body: JSON.stringify(discountData)
    });
    return res.ok;
  }

  async setHappyHour(id: string | number, happyHourData: HappyHourData) {
     const res = await fetch(`${this.API_PRODUCTS_URL}/${id}/happyHour`, {
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
