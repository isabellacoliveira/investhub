import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  name: string;
  description: string;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  getProducts(): Observable<Product[]> {
    return of([
      {
        name: 'Conta Corrente',
        description: 'Movimentação diária e pagamentos',
        active: true,
      },
      {
        name: 'Cartão de Crédito',
        description: 'Cartão internacional com benefícios',
        active: true,
      },
      {
        name: 'Empréstimo Pessoal',
        description: 'Crédito rápido e online',
        active: false,
      },
    ]);
  }
}
