# Guia Prático: Microfrontends com Angular + Module Federation

## 🎯 O que são Microfrontends?

**Microfrontends** = Microservices do Frontend. Apps independentes que se compõem dinamicamente.

**Neste projeto** (`investhub`):
- **Shell** (4200): Orquestrador 🎛️
- **Portfolio** (4201): Módulo Investimentos 📊
- **Products** (4202): Módulo Produtos 🛒

Usa **[Module Federation](https://module-federation.io/)** (Webpack 5) + [@angular-architects/module-federation](https://www.npmjs.com/package/@angular-architects/module-federation).

## 🚀 Cenário 1: Setup e Execução Básica (2 min)

### Passo a Passo:
```bash
# 1. Instalar (se novo clone)
npm install

# 2. Iniciar TODOS os apps
npm run start:all
```
**Saída esperada** (3 terminais):
```
Shell: http://localhost:4200
Portfolio: http://localhost:4201  
Products: http://localhost:4202
```

### 3. Testar no Browser
```
http://localhost:4200/dashboard
```
- Clique **Investimentos** → Carrega de 4201 (veja Network: `remoteEntry.js`)
- Clique **Produtos** → Carrega de 4202

**Prova**: F12 → Network → Filtre `remoteEntry` → Lazy load ✅

## 🔄 Cenário 2: Edição em Tempo Real + Hot Reload (3 min)

### 2.1 Editar componente remoto
```bash
# Terminal Portfolio (4201 rodando)
cd projects/portfolio/src/app/pages/investments/
```
**Edite** `investments.component.ts`:
```ts
export class InvestmentsComponent {
  // ... código existente
  ngOnInit() {
    console.log('🚀 MICROFRONTEND FUNCIONANDO!');
    // resto...
  }
}
```

**Resultado**: 
1. Salve → Auto-reload em 4201
2. Vá shell: `/investments` → Console: `🚀 MICROFRONTEND FUNCIONANDO!` ✅

### 2.2 Editar serviço compartilhado
**Em** `investments.service.ts`:
```ts
getInvestments() {
  return of([
    { id: 1, name: 'PETR4 - Atualizado via MF!', value: 35.50 },
    // ...
  ]);
}
```
**Veja mudança imediata** no shell! ✨

## 💥 Cenário 3: Simular Falha (Outage) + Error Handling (2 min)

```bash
# 1. Mate Portfolio (Investimentos falha)
npm run demo:outage:portfolio

# 2. Shell: Acesse /investments
```
**Esperado**: Erro 404 no remoteEntry.js → Shell continua funcionando!

**Recuperar**:
```bash
npm run start:portfolio  # No terminal Portfolio
```

## ➕ Cenário 4: Adicionar Nova Rota/Remote (5 min)

### 4.1 No Shell (`projects/shell/src/app/app.routes.ts`):
```ts
{
  path: 'novofeature',
  loadChildren: () => import('products/Component').then(m => m.ProductsModule)
}
```

### 4.2 No Shell template (`app.component.html`):
```html
<a routerLink="/novofeature">Novo Feature</a>
```

**Teste**: `/novofeature` → Products carrega! 🔗

## 🔨 Cenário 5: Build de Produção (3 min)

```bash
# 1. Builds separados
cd projects/shell && ng build
cd ../portfolio && ng build  
cd ../products && ng build

# 2. Atualize webpack shell (URLs CDN)
remotes: {
  portfolio: 'https://cdn.example.com/portfolio/remoteEntry.js',
}
```

**Sirva** `dist/` com nginx/live-server.

## 🛠️ Cenário 6: Troubleshooting Comum

| Problema | Solução |
|----------|---------|
| Porta ocupada | `npm run stop:all` |
| 'Shared lib conflict' | `singleton: true` no webpack |
| Hot reload falha | Restart `start:all` |
| Remote 404 | Verifique URL/porta no webpack |

## 🎭 Dicas para Live/Demo

1. **3 Terminais VSCode**: Shell / Portfolio / Products
2. **DevTools**:
   - Network: Veja `remoteEntry.js` carregando
   - Console: Logs dos remotos
3. **Mate apps**: `Ctrl+C` ou `npm run demo:outage:*`
4. **Limpar**: `taskkill /F /IM node.exe`

## 📋 Comandos Úteis (Copy-Paste)

```bash
npm run start:all     # Tudo
npm run start:shell   # Só shell  
npm run stop:all      # Kill all
npm run demo:outage:portfolio  # Simula falha
```

## Próximos Passos
- [ ] Autenticação shared
- [ ] Deploy Vercel/Netlify
- [ ] Mais remotes dinâmicos

**Guia completo! Testado para lives/tutorials. Boa sorte! 🚀**

*Gerado por BLACKBOXAI para Investhub*

