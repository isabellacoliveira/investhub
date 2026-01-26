// Importa helpers do Module Federation para Angular
// withModuleFederationPlugin: abstrai a configuração do Webpack
// shareAll: facilita o compartilhamento de dependências
const { shareAll, withModuleFederationPlugin } =
  require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  // Aqui declaramos quais microfrontends REMOTOS
  // o shell conhece e pode consumir
  remotes: {
    // Nome do remote (tem que bater com o name do webpack do remote)
    // Valor: URL onde o remoteEntry.js está disponível
    "portfolio": "http://localhost:4200/remoteEntry.js",

    "products": "http://localhost:4200/remoteEntry.js",    
  },

  // Dependências compartilhadas entre shell e remotes
  shared: {
    // Compartilha todas as libs do package.json
    // singleton evita múltiplas instâncias do Angular
    // strictVersion garante compatibilidade de versões
    // requiredVersion auto deixa o Angular resolver
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },

});
