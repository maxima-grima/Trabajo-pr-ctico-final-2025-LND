import { Component, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/category-service';
import { ProductsService } from '../../services/product-service';
import { AuthService } from '../../services/auth-service';
import { Category } from '../../interfaces/category';
import Swal from 'sweetalert2';
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
  category = input.required<Category>()


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

  async deleteCategory(categoryId: number) {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción. La categoría se eliminará permanentemente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      this.isLoading = true;
      const success = await this.categoriesService.deleteCategory(categoryId);
      this.isLoading = false;

      if (success) {
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      } else {
        Swal.fire(
          'Error',
          'Hubo un problema al eliminar el producto.',
          'error'
        );
      }
    }
  }

  createProduct() {
    this.router.navigate(['/admin/products/new']);
  }

  editProduct(productId: number) {
    this.router.navigate(['/admin/products', productId]);
  }

  async deleteProduct(productId: number) {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción. El producto se eliminará permanentemente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      this.isLoading = true;
      const success = await this.productsService.deleteProduct(productId);
      this.isLoading = false;

      if (success) {
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      } else {
        Swal.fire(
          'Error',
          'Hubo un problema al eliminar el producto.',
          'error'
        );
      }
    }
  }
}