import { Component, inject, input, viewChild } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { CategoriesService } from '../../services/category-service';
import { ProductsService } from '../../services/product-service';
import { UsersService } from '../../services/users-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { Spinner } from "../../Components/spinner/spinner";
import { NewProduct } from '../../interfaces/products';

@Component({
  selector: 'app-new-edit-category-page',
  imports: [FormsModule, Spinner],
  templateUrl: './new-edit-category-page.html',
  styleUrl: './new-edit-category-page.scss'
})
export class NewEditCategoryPage {
  restaurantService=inject(UsersService)
  productService=inject(ProductsService)
  authService = inject(AuthService)
  categoryService = inject(CategoriesService)
  idCategory = input<number>(); 
  router=inject(Router)
  categoryOriginal: Category | undefined = undefined;
  idUser = this.authService.getUserId();
  form = viewChild<NgForm>(`newProductForm`);
  errorBack=false;
  isLoading = false;  

  async ngOnInit() {
    if (this.idCategory()) {
      this.categoryOriginal = await this.categoryService.getCategoriesByRestaurant(this.idUser);
      this.form()?.setValue({
        Name: this.categoryOriginal!.name,
      })
    }
    await this.categoriesService.getCategoriesByRestaurant(this.authService.getUserId());
  }
  async handleFormSubmission(form: NgForm) {
    this.errorBack = false;
    const nuevoProducto: NewProduct = {
      name: form.value.name,
      description: form.value.Descripcion,
      price: form.value.Precio,
      IsFeatured: form.value.Destacado,
      recommendedFor: form.value.Recomendado,
      discount: form.value.Descuento,
      hasHappyHour: form.value.HappyHour,
      categoryId: form.value.categoryId,
      restaurantId: this.authService.getUserId() ,
    }
    let res;
    this.isLoading = true;
    if (this.idProducto()) {
      res = await this.productService.updateProduct({
        ...nuevoProducto,
        id: this.idProducto()!
      });
    } else {
      res = await this.productService.createProduct(nuevoProducto);
    }

    this.isLoading = false;

    if (!res) {
      this.errorBack = true;
      return
    };

    this.router.navigate(["/admin", res.id]);
  }


}
