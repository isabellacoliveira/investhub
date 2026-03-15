import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
{
    path: 'portfolio',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Module',
      }).then(m => m.InvestmentsModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './Component',
      }).catch(err => {
        console.error('Products load failed:', err);
        throw err;
      }).then(m => m.ProductsModule),
  },
  { path: '**', redirectTo: '/dashboard' }
];

