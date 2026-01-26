// Importa o tipo Routes, que define a estrutura de rotas no Angular
import { Routes } from '@angular/router';

// Exporta a configuração de rotas desse projeto (ou remote)
export const routes: Routes = [
  {
    // Rota raiz da aplicação ou do microfrontend
    // Quando alguém acessar esse módulo sem subrota
    path: '',

    // loadChildren define que esse módulo será carregado sob demanda (lazy loading)
    // Ou seja: o código só é baixado quando a rota é acessada
    loadChildren: () =>
      import('./pages/investments/investments.module')
        // Aqui fazemos o import dinâmico do módulo
        // Depois que o arquivo é carregado, retornamos o InvestmentsModule
        .then(m => m.InvestmentsModule),
  },
];
