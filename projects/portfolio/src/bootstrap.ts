// Função responsável por inicializar (dar o start) na aplicação Angular
// Substitui o bootstrap feito via AppModule nas versões mais antigas
import { bootstrapApplication } from '@angular/platform-browser';

// Configuração global da aplicação
// Aqui ficam providers, rotas, interceptors, etc.
import { appConfig } from './app/app.config';

// Componente raiz da aplicação
// É o primeiro componente que o Angular vai renderizar
import { AppComponent } from './app/app.component';

// Aqui acontece o bootstrap da aplicação
// O Angular cria a aplicação a partir do AppComponent
// e aplica todas as configurações definidas no appConfig
bootstrapApplication(AppComponent, appConfig)

  // Caso ocorra algum erro durante a inicialização,
  // ele será capturado e exibido no console
  .catch((err) => console.error(err));
