import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/investments/investments.module')
        .then(m => m.InvestmentsModule),
  },
];
