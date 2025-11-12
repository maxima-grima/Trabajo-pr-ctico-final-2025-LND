import { Component, inject, input, viewChild } from '@angular/core';
import { UsersService } from '../../services/users-service';
import { Router } from '@angular/router';
import { NewProduct, Product } from '../../interfaces/products';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductsService } from '../../services/product-service';
import { AuthService } from '../../services/auth-service';
import { CategoriesService } from '../../services/category-service';
import { Category } from '../../interfaces/category';
@Component({
  selector: 'app-new-edit-product-page',
  imports: [FormsModule],
  templateUrl: './new-edit-product-page.html',
  styleUrl: './new-edit-product-page.scss'
})
export class NewEditProductPage {
  restaurantService=inject(UsersService)
  productService=inject(ProductsService)
  authService = inject(AuthService)
  categoriesService = inject(CategoriesService)
  idProducto= input<number>();
  router=inject(Router)
  productoOriginal: Product | undefined = undefined;
  categories: Category[] = [];
  form = viewChild<NgForm>(`newProductForm`);
  errorBack=false;
  isLoading = false;
  

  async ngOnInit() {
    if (this.idProducto()) {
      this.productoOriginal = await this.productService.getProductById(this.idProducto()!);
      this.form()?.setValue({
        Name: this.productoOriginal!.name,
        Descripcion: this.productoOriginal!.description,
        Price: this.productoOriginal!.price,
        Destacado: this.productoOriginal!.IsFeatured,
        Recomendado: this.productoOriginal!.recommendedFor,
        Descuento: this.productoOriginal!.discount,
        HappyHour: this.productoOriginal!.hasHappyHour,
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
