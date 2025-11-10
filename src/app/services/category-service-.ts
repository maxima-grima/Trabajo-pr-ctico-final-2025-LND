import { inject, Injectable, signal } from '@angular/core';
import { Category, NewCategory } from '../interfaces/category';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  authService = inject(AuthService);
  readonly API_URL = "https://restaurant-api.somee.com/api/Categories";

  categories = signal<Category[]>([]);


  
  async getCategoriesByRestaurant(restaurantId: string) {
    const res = await fetch(`${this.API_URL}/restaurant/${restaurantId}`);
    if (!res.ok) return;
    const data = (await res.json()) as Category[];
    this.categories.set(data);
  }



  async createCategory(category: NewCategory) {
    const res = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
      body: JSON.stringify(category)
    });
    if (!res.ok) return undefined;
    const newCategory = (await res.json()) as Category;
    this.categories.update(current => [...current, newCategory]);
    return newCategory;
  }
  
  async updateCategory(category: Category) {
     const res = await fetch(`${this.API_URL}/${category.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.token}`
      },
      body: JSON.stringify(category)
    });
    if (!res.ok) return undefined;
    this.categories.update(current => 
      current.map(c => c.id === category.id ? category : c)
    );
    return category;
  }

  async deleteCategory(id: string | number) {
    const res = await fetch(`${this.API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${this.authService.token}` }
    });
    if (!res.ok) return false;
    this.categories.update(current => current.filter(c => c.id !== id));
    return true;
  }
}

