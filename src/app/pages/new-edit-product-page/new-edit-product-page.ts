import { Component, inject, input, viewChild } from '@angular/core';
import { UsersService } from '../../services/users-service';
import { Router } from '@angular/router';
import { NewProduct, Product } from '../../interfaces/products';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../../services/product-service';
@Component({
  selector: 'app-new-edit-product-page',
  imports: [],
  templateUrl: './new-edit-product-page.html',
  styleUrl: './new-edit-product-page.scss'
})
export class NewEditProductPage {
  restaurantService=inject(UsersService)
  productService=inject(ProductsService)
  idProducto= input<number>();
  router=inject(Router)
  productoOriginal: Product | undefined = undefined;
  form = viewChild<NgForm>(`newProductForm`);
  errorBack=false;
  isLoading = false;
  

  async ngOnInit() {
    if (this.idProducto()) {
      this.productoOriginal = await this.productService.getProductById(this.idProducto()!);
      this.form()?.setValue({
        Name: this.productoOriginal!.name,
        Descripcion: this.productoOriginal!.description,
        Precio: this.productoOriginal!.price,
        Destacado: this.productoOriginal!.IsFeatured,
        Recomendado: this.productoOriginal!.recommendedFor,
        Descuento: this.productoOriginal!.discount,
        HappyHour: this.productoOriginal!.hasHappyHour,
      })
    }

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
      categoryId: form.value.categoryId
      restaurantId: ,
    }
    let res;
    this.isLoading = true;
    if (this.idProducto()) {
      res = await this.productService.updateProduct({
        ...nuevoProducto,
        id: this.idProducto()!.toString()
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
}