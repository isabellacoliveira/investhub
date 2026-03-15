import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Investment {
  name: string;
  value: number;
  type: string;
}

interface Product {
  name: string;
  description: string;
  active: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="dashboard">
      <h1>📈 Dashboard Geral</h1>
      <div class="stats">
        <div class="stat">
          <h2>Total Investido</h2>
          <p>R$ {{ totalInvested | number:'1.2-2' }}</p>
        </div>
        <div class="stat">
          <h2>Produtos Ativos</h2>
          <p>{{ activeProducts }}</p>
        </div>
      </div>
      <div *ngIf="error" class="error">Erro ao carregar dados: {{ error }}</div>
      <p>Demo: Mesmo com erro em um MF, dashboard parcial funciona.</p>
    </section>
  `,
  styles: [`
    .dashboard { padding: 2rem; }
    .stats { display: flex; gap: 2rem; margin-bottom: 1rem; }
    .stat { background: #f0f8ff; padding: 1.5rem; border-radius: 8px; flex: 1; text-align: center; }
    .stat h2 { margin: 0 0 0.5rem; color: #666; }
    .stat p { font-size: 1.5rem; font-weight: bold; color: #007bff; margin: 0; }
    .error { color: #dc3545; background: #f8d7da; padding: 1rem; border-radius: 4px; }
    h1 { color: #333; }
  `]
})
export class DashboardComponent implements OnInit {
  totalInvested = 0;
  activeProducts = 0;
  error = '';

  ngOnInit() {
    // Simulate data for demo (no service dependency to avoid shared issues)
    const mockInvestments: Investment[] = [
      { name: 'Tesouro Direto', value: 5000, type: 'Renda Fixa' },
      { name: 'Ações ITUB4', value: 3200, type: 'Renda Variável' },
      { name: 'FII', value: 2100, type: 'Imobiliário' }
    ];
    this.totalInvested = mockInvestments.reduce((sum, i) => sum + i.value, 0);

    // Simulate partial error
    if (Math.random() > 0.3) {
      const mockProducts: Product[] = [
        { name: 'Conta Corrente', description: '', active: true },
        { name: 'Cartão', description: '', active: true }
      ];
      this.activeProducts = mockProducts.filter(p => p.active).length;
    } else {
      this.error = 'Falha ao carregar produtos (simulado para demo)';
    }
  }
}
