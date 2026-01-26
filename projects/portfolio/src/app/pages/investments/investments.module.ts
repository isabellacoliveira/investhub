// Importa o NgModule, que é o decorator usado para declarar um módulo no Angular
import { NgModule } from '@angular/core';

// Importa funcionalidades básicas do Angular, como *ngIf, *ngFor, pipes, etc.
import { CommonModule } from '@angular/common';

// Importa o RouterModule para configurar rotas dentro deste módulo
import { RouterModule } from '@angular/router';

// Importa o componente principal desse módulo (a tela de Investments)
import { InvestmentsComponent } from './investments.component';

@NgModule({
  // Aqui declaramos quais componentes pertencem a este módulo
  // Ou seja, quais componentes são "donos" desse módulo
  declarations: [InvestmentsComponent],

  imports: [
    // CommonModule é obrigatório em módulos que NÃO são o AppModule
    // Ele fornece diretivas básicas usadas nos templates
    CommonModule,

    // forChild é usado para configurar rotas de módulos filhos
    // Muito comum em lazy loading e Microfrontends
    RouterModule.forChild([
      {
        // Quando a rota estiver vazia (''),
        // ou seja, quando o módulo for carregado,
        // esse componente será exibido
        path: '',
        component: InvestmentsComponent,
      },
    ]),
  ],
})
// Exporta o módulo para que ele possa ser carregado
// (por exemplo, via Module Federation ou lazy loading)
export class InvestmentsModule {}
