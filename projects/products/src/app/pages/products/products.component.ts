import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '../../shared/service/products.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filter = new FormControl('');

  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.service.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  toggleActive(product: Product) {
    product.active = !product.active;
  }

  get filteredProducts() {
    const term = this.filter.value?.toLowerCase() || '';
    return this.products.filter(p => p.name.toLowerCase().includes(term));
  }
}



