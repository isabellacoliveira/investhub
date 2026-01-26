import { Component, OnInit } from '@angular/core';
import { Investment, InvestmentsService } from '../../shared/services/investments.service';

@Component({
  selector: 'app-investments',
  standalone: false,
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.scss'
})
export class InvestmentsComponent implements OnInit {
  investments: Investment[] = [];

  constructor(private service: InvestmentsService) {}

  ngOnInit(): void {
    this.service.getInvestments().subscribe(data => {
      this.investments = data;
    });
  }
}
