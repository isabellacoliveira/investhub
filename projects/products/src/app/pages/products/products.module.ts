import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsComponent,
      },
    ]),
  ],
})
export class ProductsModule {}
