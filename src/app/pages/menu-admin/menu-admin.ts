import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/category-service';
import { ProductsService } from '../../services/product-service';
import { AuthService } from '../../services/auth-service';
import { Category } from '../../interfaces/category';
import { Product } from '../../interfaces/products';

@Component({
  selector: 'app-menu-admin',
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-admin.html',
  styleUrl: './menu-admin.scss'
})
export class MenuAdminComponent implements OnInit {
  categoriesService = inject(CategoriesService);
  productsService = inject(ProductsService);
  authService = inject(AuthService);
  router = inject(Router);

  activeTab: 'categories' | 'products' = 'categories';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.isLoading = true;
    try {
      await this.categoriesService.getCategoriesByRestaurant(this.authService.getUserId());
      await this.productsService.getProductsByRestaurant(this.authService.getUserId());
    } catch (error) {
      this.errorMessage = 'Error al cargar los datos';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  switchTab(tab: 'categories' | 'products') {
    this.activeTab = tab;
    this.errorMessage = '';
    this.successMessage = '';
  }

  createCategory() {
    this.router.navigate(['/admin/categories/new']);
  }

  editCategory(categoryId: number) {
    this.router.navigate(['/admin/categories', categoryId]);
  }

  async deleteCategory(categoryId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.isLoading = true;
      const success = await this.categoriesService.deleteCategory(categoryId);
      
      if (success) {
        this.successMessage = 'Categoría eliminada correctamente';
        setTimeout(() => this.successMessage = '', 3000);
      } else {
        this.errorMessage = 'Error al eliminar la categoría';
      }
      this.isLoading = false;
    }
  }

  createProduct() {
    this.router.navigate(['/admin/products/new']);
  }

  editProduct(productId: number) {
    this.router.navigate(['/admin/products', productId]);
  }

  async deleteProduct(productId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.isLoading = true;
      const success = await this.productsService.deleteProduct(productId);
      
      if (success) {
        this.successMessage = 'Producto eliminado correctamente';
        setTimeout(() => this.successMessage = '', 3000);
      } else {
        this.errorMessage = 'Error al eliminar el producto';
      }
      this.isLoading = false;
    }
  }
}