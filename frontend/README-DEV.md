# 🚀 Aquário Frontend - Guia de Desenvolvimento

Este guia cobre tudo que você precisa saber para desenvolver o frontend do Aquário localmente.

## 📋 Pré-requisitos

Antes de começar a desenvolver, certifique-se de ter o seguinte instalado:

### Software Obrigatório

| Software    | Versão | Propósito              | Instalação                                      |
| ----------- | ------ | ---------------------- | ----------------------------------------------- |
| **Node.js** | 18+    | Runtime JavaScript     | [Download em nodejs.org](https://nodejs.org/)   |
| **npm**     | 9+     | Gerenciador de pacotes | Vem com o Node.js                               |
| **Git**     | Latest | Controle de versão     | [Download em git-scm.com](https://git-scm.com/) |

### Opcional mas Recomendado

| Software            | Propósito                  | Instalação                                                                             |
| ------------------- | -------------------------- | -------------------------------------------------------------------------------------- |
| **VS Code**         | Editor de código           | [Download em code.visualstudio.com](https://code.visualstudio.com/)                    |
| **Chrome DevTools** | Debug de aplicações web    | Vem com Chrome                                                                         |
| **React DevTools**  | Debug de componentes React | [Extensão do Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/) |

### Requisitos do Sistema

- **macOS**: 10.15+ (Catalina ou superior)
- **Windows**: Windows 10+ com WSL2
- **Linux**: Ubuntu 18.04+ ou equivalente
- **RAM**: 8GB mínimo, 16GB recomendado
- **Armazenamento**: 2GB de espaço livre

### Verificação da Configuração

Execute estes comandos para verificar sua configuração:

```bash
# Verificar versão do Node.js (deve ser 18+)
node --version

# Verificar versão do npm (deve ser 9+)
npm --version

# Verificar versão do Git
git --version
```

---

## 📋 Início Rápido

### Configuração Inicial

```bash
# 1. Navegue até o diretório frontend
cd frontend

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

### Desenvolvimento Diário

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Em outro terminal, executar verificações
npm run check-all
```

## 🛠️ Comandos Disponíveis

### Comandos de Desenvolvimento

| Comando         | O que faz                                    | Quando usar                |
| --------------- | -------------------------------------------- | -------------------------- |
| `npm run dev`   | Servidor de desenvolvimento com hot reload   | **Desenvolvimento diário** |
| `npm run build` | Build de produção (otimizado)                | Antes do deploy            |
| `npm run start` | Servidor de produção (requer build primeiro) | Deploy de produção         |

### Comandos de Qualidade de Código

| Comando                | O que faz                                              | Quando usar                     |
| ---------------------- | ------------------------------------------------------ | ------------------------------- |
| `npm run lint`         | Verificar problemas de linting                         | Antes de commits                |
| `npm run lint:fix`     | Corrigir problemas de linting automaticamente          | Corrigir problemas encontrados  |
| `npm run format`       | Formatar código com Prettier                           | Formatar código                 |
| `npm run format:check` | Verificar se código está formatado                     | CI/CD ou verificação pré-commit |
| `npm run type-check`   | Verificar tipos TypeScript                             | Verificar erros de tipo         |
| `npm run check-all`    | Executar todas as verificações (lint + format + types) | **Verificação completa**        |

### Comandos de Testes

| Comando                    | O que faz                                               | Quando usar                         |
| -------------------------- | ------------------------------------------------------- | ----------------------------------- |
| `npm run test`             | Testes unitários com Jest                               | **Testes durante desenvolvimento**  |
| `npm run test:watch`       | Testes em modo watch (re-executa quando arquivos mudam) | Desenvolvimento com TDD             |
| `npm run test:coverage`    | Testes com relatório de cobertura                       | Verificar cobertura de testes       |
| `npm run test:integration` | Testes de integração com Vitest                         | Testar integração entre componentes |
| `npm run test:e2e`         | Testes end-to-end com Playwright                        | Testar fluxos completos             |
| `npm run test:all`         | Executar todos os tipos de teste                        | **Verificação completa de testes**  |

## 🏗️ Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Estilos globais
│   │   ├── layout.tsx          # Layout raiz
│   │   ├── page.tsx            # Página inicial
│   │   ├── guias/              # Páginas de guias
│   │   ├── _blog/              # Sistema de blog
│   │   ├── _entidades/         # Entidades e laboratórios
│   │   ├── _projetos/          # Projetos de pesquisa
│   │   ├── _vagas/             # Vagas e oportunidades
│   │   ├── _usuarios/          # Perfis de usuários
│   │   └── _pesquisar/         # Funcionalidade de busca
│   ├── components/
│   │   ├── ui/                 # Componentes base (Shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── shared/             # Componentes compartilhados
│   │   │   ├── nav-bar.tsx
│   │   │   ├── search-bar.tsx
│   │   │   ├── markdown-renderer.tsx
│   │   │   └── ...
│   │   └── pages/              # Componentes específicos de páginas
│   │       ├── guias/
│   │       ├── usuarios/
│   │       └── vagas/
│   ├── contexts/               # Contextos React
│   │   ├── auth-context.tsx    # Contexto de autenticação
│   │   └── search-context.tsx  # Contexto de busca
│   └── lib/                    # Utilitários
│       └── utils.ts            # Funções utilitárias
├── public/                     # Arquivos estáticos
├── components.json             # Configuração Shadcn/ui
├── tailwind.config.ts          # Configuração Tailwind
├── tsconfig.json               # Configuração TypeScript
└── package.json                # Dependências e scripts
```

## 🎨 Tecnologias e Bibliotecas

### Core Framework

- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca de interface
- **TypeScript** - Tipagem estática

### Styling

- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Biblioteca de componentes (Radix UI)
- **Material-UI** - Componentes adicionais
- **Lucide React** - Ícones

### Funcionalidades

- **TipTap** - Editor de texto rico
- **React Markdown** - Renderização de Markdown
- **Next Themes** - Gerenciamento de temas
- **DOMPurify** - Sanitização de HTML

### Desenvolvimento

- **ESLint** - Análise estática
- **Prettier** - Formatação de código
- **Jest** - Testes unitários
- **Vitest** - Testes de integração
- **Playwright** - Testes E2E

## 🔧 Configuração de Desenvolvimento

### VS Code Extensions Recomendadas

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Configuração do VS Code

Crie `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  }
}
```

## 🧪 Guia de Testes

### Estrutura de Testes

```
src/
├── __tests__/              # Testes unitários
│   ├── components/
│   ├── pages/
│   └── utils/
├── __mocks__/              # Mocks para testes
└── tests/                  # Testes E2E
    └── e2e/
```

### Tipos de Teste

#### 1. Testes Unitários (Jest)

```typescript
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

#### 2. Testes de Integração (Vitest)

```typescript
// __tests__/integration/search.test.tsx
import { render, screen } from '@testing-library/react'
import { SearchPage } from '@/app/_pesquisar/page'

describe('Search Integration', () => {
  it('searches and displays results', async () => {
    render(<SearchPage />)
    // Test integration between components
  })
})
```

#### 3. Testes E2E (Playwright)

```typescript
// tests/e2e/search.spec.ts
import { test, expect } from "@playwright/test";

test("search functionality", async ({ page }) => {
  await page.goto("/_pesquisar");
  await page.fill('[data-testid="search-input"]', "test query");
  await page.click('[data-testid="search-button"]');
  await expect(page.locator('[data-testid="search-results"]')).toBeVisible();
});
```

### Executando Testes

```bash
# Testes unitários
npm run test

# Testes com watch
npm run test:watch

# Testes com cobertura
npm run test:coverage

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e

# Todos os testes
npm run test:all
```

## 🎨 Guia de Componentes

### Criando Novos Componentes

#### 1. Componente UI (Shadcn/ui)

```bash
# Adicionar componente do Shadcn/ui
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
```

#### 2. Componente Compartilhado

```typescript
// src/components/shared/my-component.tsx
import { cn } from '@/lib/utils'

interface MyComponentProps {
  className?: string
  children: React.ReactNode
}

export function MyComponent({ className, children }: MyComponentProps) {
  return (
    <div className={cn('base-styles', className)}>
      {children}
    </div>
  )
}
```

#### 3. Componente de Página

```typescript
// src/components/pages/guias/guide-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface GuideCardProps {
  title: string
  description: string
  slug: string
}

export function GuideCard({ title, description, slug }: GuideCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}
```

### Convenções de Componentes

- **Props**: Sempre tipadas com TypeScript
- **Styling**: Tailwind CSS com `cn()` para classes condicionais
- **Naming**: kebab-case para arquivos de componentes
- **Exports**: Named exports, não default exports
- **Props destructuring**: Sempre desestruturar props

## 🔍 Debugging

### Ferramentas de Debug

#### 1. React DevTools

- Instale a extensão do Chrome
- Inspecione componentes e estado
- Profile de performance

#### 2. Next.js DevTools

```bash
# Habilitar análise de bundle
npm run build
npm run start
```

#### 3. TypeScript Errors

```bash
# Verificar tipos
npm run type-check

# Verificar arquivo específico
npx tsc --noEmit src/components/my-component.tsx
```

## 🚀 Build e Deploy

### Build de Produção

```bash
# Build otimizado
npm run build

# Verificar build
npm run start
```

### Otimizações de Build

- **Code Splitting**: Automático com Next.js
- **Image Optimization**: `next/image`
- **Font Optimization**: `next/font`
- **Bundle Analysis**: `@next/bundle-analyzer`

### Deploy

#### Vercel (Recomendado)

```bash
# Deploy automático
vercel

# Deploy de produção
vercel --prod
```

#### Outras Plataformas

- **Netlify**: Compatível com Next.js
- **Railway**: Deploy simples
- **Docker**: Containerização

## 🔍 Solução de Problemas

### Problemas Comuns

#### "Module not found"

```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install
```

#### "TypeScript errors"

```bash
# Verificar tipos
npm run type-check

# Regenerar tipos
npx tsc --noEmit
```

#### "Build fails"

```bash
# Verificar linting
npm run lint

# Verificar formatação
npm run format:check
```

#### "Tests failing"

```bash
# Limpar cache de testes
npm test -- --clearCache

# Executar testes específicos
npm test -- MyComponent.test.tsx
```

### Performance Issues

#### 1. Bundle Size

```bash
# Analisar bundle
npm run build
# Verificar output em .next/analyze/
```

## 📚 Recursos Adicionais

### Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)

### Ferramentas Úteis

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Next.js DevTools](https://nextjs.org/docs/advanced-features/debugging)

---

## 🚀 Referência Rápida

```bash
# Desenvolvimento diário
npm run dev

# Verificação completa
npm run check-all

# Todos os testes
npm run test:all

# Build de produção
npm run build
```

**Boa programação! 🎉**
