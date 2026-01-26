// Importa helpers da lib @angular-architects/module-federation
// withModuleFederationPlugin: abstrai toda a configuração complexa do Webpack
// shareAll: facilita o compartilhamento de dependências entre shell e remotes
const { shareAll, withModuleFederationPlugin } =
  require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  // Nome do microfrontend (remote)
  // Esse nome será usado pelo shell para referenciar essa aplicação
  name: 'portfolio',

  // Aqui definimos o que esse microfrontend expõe para o mundo externo
  exposes: {
    // './Module' é o nome público do que está sendo exposto
    // O shell vai importar exatamente com esse alias
    './Module': './projects/portfolio/src/app/pages/investments/investments.module.ts',
  },

  // Configuração de dependências compartilhadas entre shell e remotes
  shared: {
    // shareAll compartilha TODAS as dependências do package.json
    // singleton: garante que só exista UMA instância da lib na aplicação inteira
    // strictVersion: exige que as versões sejam compatíveis entre shell e remote
    // requiredVersion: 'auto' deixa o Angular resolver a versão correta
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});
