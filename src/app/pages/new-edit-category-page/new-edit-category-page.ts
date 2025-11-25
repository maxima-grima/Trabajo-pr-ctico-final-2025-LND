import { Component, inject, input, viewChild } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { CategoriesService } from '../../services/category-service';
import { ProductsService } from '../../services/product-service';
import { UsersService } from '../../services/users-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Category, NewCategory, UpdateCategoryRequestDto } from '../../interfaces/category';
import { Spinner } from "../../Components/spinner/spinner";

@Component({
  selector: 'app-new-edit-category-page',
  imports: [FormsModule, Spinner],
  templateUrl: './new-edit-category-page.html',
  styleUrl: './new-edit-category-page.scss'
})
export class NewEditCategoryPage {
  authService = inject(AuthService)
  categoryService = inject(CategoriesService)
  router = inject(Router)

  idCategory = input<number>();
  categoryOriginal: Category | undefined = undefined;
  form = viewChild<NgForm>(`newCategoryForm`);
  errorBack = false;
  isLoading = false;

  async ngOnInit() {
    // Obtener la categoría específica para editar
    const allCategories = this.categoryService.categories();
    this.categoryOriginal = allCategories.find(cat => cat.id == this.idCategory());

    if (this.categoryOriginal) {
      this.form()?.setValue({
        name: this.categoryOriginal.name,
      });
    } else {
      // Cargar todas las categorías del restaurante
      await this.categoryService.getCategoriesByRestaurant(this.authService.getUserId());
      const freshCategories = this.categoryService.categories();
      this.categoryOriginal = freshCategories.find(cat => cat.id == this.idCategory()!);

      // Si ahora sí aparece, rellena el form
      if (this.categoryOriginal) {
        this.form()?.setValue({
          name: this.categoryOriginal.name,
        });
      }
    }
  }


  async handleFormSubmission(form: NgForm) {
    this.errorBack = false;
    const nuevaCategory: NewCategory = {
      name: form.value.name,
      restaurantId: this.authService.getUserId(),
    }

    let res;
    this.isLoading = true;

    if (this.idCategory()) {
      //Edita categoría existente
      const updateData: UpdateCategoryRequestDto = {
        name: nuevaCategory.name
      }
      res = await this.categoryService.updateCategory(this.idCategory()!, updateData);
    } else {
      // Crear nueva categoría
      res = await this.categoryService.createCategory(nuevaCategory);
    }

    this.isLoading = false;

    if (!res) {
      this.errorBack = true;
      return
    };

    this.router.navigate(["/"]);
  }


}
