import { Component } from '@angular/core';
import { Product, ProductsService } from '../../shared/service/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.service.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}



