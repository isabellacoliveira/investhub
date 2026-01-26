// Importa o tipo Routes para definir as rotas da aplicação
import { Routes } from '@angular/router';

// Função responsável por carregar microfrontends remotos
// via Module Federation
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    // Quando o usuário acessar /portfolio
    path: 'portfolio',

    // Em vez de carregar um módulo local,
    // o shell carrega um módulo REMOTO
    loadChildren: () =>
      loadRemoteModule({
        // Indica que o remote é um módulo JavaScript
        // padrão do Webpack 5
        type: 'module',

        // Endereço do remoteEntry.js
        // Esse arquivo é o "manifest" do microfrontend
        remoteEntry: 'http://localhost:4201/remoteEntry.js',

        // Nome do que está sendo exposto no webpack.config do remote
        // Deve bater exatamente com o exposes
        exposedModule: './Module',
      })
      // Após carregar o código remoto,
      // retornamos o módulo Angular que será renderizado
      .then(m => m.InvestmentsModule),
  },
  {
    // Segunda rota do shell: /products
    path: 'products',

    loadChildren: () =>
      loadRemoteModule({
        type: 'module',

        // Outro microfrontend, rodando em outra porta
        remoteEntry: 'http://localhost:4202/remoteEntry.js',

        // Aqui estamos consumindo outro expose
        exposedModule: './Component',
      })
      // Módulo que será carregado quando a rota for acessada
      .then(m => m.ProductsModule),
  },
];
