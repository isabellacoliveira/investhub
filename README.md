# Investhub - Demo Module Federation com Angular

## 🎉 Introdução

Bem-vindo ao **Investhub**, um projeto de demonstração de **[Module Federation](https://module-federation.io/)** usando Angular 17+ e o plugin [@angular-architects/module-federation](https://www.npmjs.com/package/@angular-architects/module-federation).

**O que é isso?**
- **Shell** (localhost:4200): Aplicação host que consome módulos remotos dinamicamente.
- **Portfolio** (localhost:4201): Remote app que expõe o módulo de **Investimentos**.
- **Products** (localhost:4202): Remote app que expõe o módulo de **Produtos**.

Ideal para lives/demos: mostra lazy-loading de módulos Angular entre apps independentes, simulando microfrontends.

## 📋 Pré-requisitos

- Node.js >= 18
- Angular CLI >= 17 (`npm i -g @angular/cli@latest`)
- Git
- VS Code (opcional, mas recomendado)

## 🚀 Instalação e Setup (5 min)

1. Clone o repo:
   ```
   git clone <repo-url>
   cd investhub
   ```

2. Instale dependências:
   ```
   npm install
   ```

3. Verifique scripts no `package.json`:
   ```
   npm run start:shell    # Apenas shell
   npm run start:portfolio # Apenas portfolio
   npm run start:products  # Apenas products
   npm run start:all       # TODOS em paralelo (usa concurrently)
   ```

## 🏗️ Arquitetura Module Federation - O que acontece nos arquivos?

### 1. **Shell** (`projects/shell/webpack.config.js`)
   - **Função**: Host, **consome** remotes.
   ```js
   remotes: {
     portfolio: "http://localhost:4201/remoteEntry.js",
     products:  "http://localhost:4202/remoteEntry.js",
   }
   ```
   - **Durante live**: Altere URLs para simular CDN/prod.

### 2. **Portfolio** (`projects/portfolio/webpack.config.js`)
   - **Função**: Remote, **expõe** módulo.
   ```js
   exposes: {
     './Module': './projects/portfolio/src/app/pages/investments/investments.module.ts',
   }
   ```
   - **Durante live**: Mude expose path ou kill server para demo outage.

### 3. **Products** (`projects/products/webpack.config.js`)
   - Similar ao portfolio:
   ```js
   exposes: {
     './Component': './projects/products/src/app/pages/products/products.module.ts',
   }
   ```

### 4. **Rotas no Shell** (`projects/shell/src/app/app.routes.ts`)
   - **Lazy load** remotos:
   ```ts
   {
     path: 'investments',
     loadChildren: () => import('portfolio/Module').then(m => m.InvestmentsModule),
   },
   {
     path: 'products',
     loadChildren: () => import('products/Component').then(m => m.ProductsModule),
   }
   ```
   - **Durante live**: Adicione novas rotas para novos remotes.

### 5. **Componentes Remotos**
   - **Investments** (`projects/portfolio/src/app/pages/investments/`): Serviço `investments.service.ts`, component `.ts/.html/.scss`.
   - **Products** (`projects/products/src/app/pages/products/`): Similar.
   - **Dashboard Shell** (`projects/shell/src/app/dashboard/`): Layout inicial.

## ⚡ Executando a Demo (Live Ready)

1. **Inicie tudo**:
   ```
   npm run start:all
   ```
   - Shell: http://localhost:4200
   - Portfolio: http://localhost:4201
   - Products: http://localhost:4202

2. **Abra no browser**: http://localhost:4200/dashboard

3. **Navegue**:
   - `/investments` → Carrega módulo remoto Portfolio
   - `/products` → Carrega módulo remoto Products

## 🎭 Cenários de Demo para Live (10-15 min)

### 1. **Setup Básico** (2 min)
   - Mostre `npm run start:all`
   - Navegue rotas, destaque lazy load (Network tab: remoteEntry.js)

### 2. **Edição em Tempo Real** (3 min)
   | Arquivo | O que fazer na live | Efeito |
   |---------|---------------------|--------|
   | `shell/webpack.config.js` | Mude porta remote para 4203 | Erro 404 → Fix |
   | `portfolio/investments.component.ts` | Adicione `console.log('MF WORKS!')` | Reload → Log no shell |
   | `shell/app.routes.ts` | Adicione rota `/new` | Novo remote |

### 3. **Outage Simulation** (2 min)
   ```
   npm run demo:outage:portfolio  # Mata portfolio
   ```
   - Shell ainda funciona, products OK, investments falha → Graceful degradation.

### 4. **Prod Build** (2 min)
   ```
   cd projects/shell && ng build
   cd ../portfolio && ng build
   # Serve dist/ com nginx/live server
   ```

### 5. **Dicas Live**:
   - Use 3 terminais VSCode.
   - Mostre Network/Console devtools.
   - `taskkill /F /IM node.exe` para limpar.

## 📁 Estrutura de Pastas

```
investhub/
├── package.json (scripts)
├── projects/
│   ├── shell/           # Host
│   │   ├── webpack.config.js (remotes)
│   │   └── src/app/app.routes.ts
│   ├── portfolio/       # Remote Investments
│   │   ├── webpack.config.js (exposes Module)
│   │   └── src/app/pages/investments/
│   └── products/        # Remote Products
│       ├── webpack.config.js (exposes Component)
│       └── src/app/pages/products/
└── README.md
```

## 🔧 Troubleshooting

- **Porta ocupada**: `npm run stop:all`
- **Erro shared libs**: Verifique `singleton: true` em webpack.
- **Hot reload não funciona**: Restart `start:all`.
- **Build prod**: Use `webpack.prod.config.js`.

## 🚀 Próximos Passos

- Adicionar autenticação shared.
- Deploy Vercel/Netlify.
- Mais remotes (ex: auth app).

**Demo pronta para live! Compartilhe no YouTube/Twitch. Boa sorte! 🎥**

*Gerado por BLACKBOXAI*

