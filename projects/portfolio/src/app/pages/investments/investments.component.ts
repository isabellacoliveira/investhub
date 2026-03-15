import { Component, OnInit, OnDestroy } from '@angular/core';
import { Investment, InvestmentsService } from '../../shared/services/investments.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-investments',
  standalone: false,
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.scss'
})
export class InvestmentsComponent implements OnInit, OnDestroy {
  investments: Investment[] = [];
  totalValue = 0;
  private sub?: Subscription;

  constructor(private service: InvestmentsService) {}

  ngOnInit(): void {
    this.loadData();
    // Real-time updates every 3s
    this.sub = interval(3000).subscribe(() => this.loadData());
  }

  loadData() {
    this.service.getInvestments().subscribe(data => {
      this.investments = data.map(inv => ({
        ...inv,
        value: inv.value * (0.98 + Math.random() * 0.04) // Simulate fluctuation ±2%
      }));
      this.totalValue = this.investments.reduce((sum, i) => sum + i.value, 0);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
