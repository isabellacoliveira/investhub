import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry } from 'rxjs';

export interface Investment {
  name: string;
  value: number;
  type: string;
}

@Injectable({ providedIn: 'root' })
export class InvestmentsService {
  getInvestments(): Observable<Investment[]> {
    return of([
      { name: 'Tesouro Direto', value: 5000, type: 'Renda Fixa' },
      { name: 'Ações ITUB4', value: 3200, type: 'Renda Variável' },
      { name: 'Fundo Imobiliário', value: 2100, type: 'FII' },
    ]).pipe(
      retry(3),
      catchError(() => of([{ name: 'Fallback', value: 0, type: 'Offline' }]))
    );
  }
}
