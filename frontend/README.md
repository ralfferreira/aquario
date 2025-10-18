# 🌊 Aquário Frontend

> **👨‍💻 Desenvolvedores**: Para guia técnico completo, veja [README-DEV.md](README-DEV.md)

## 🎨 Frontend

### Tecnologias Principais

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Biblioteca de componentes (baseada em Radix UI)
- **Material-UI** - Componentes adicionais
- **TipTap** - Editor de texto rico
- **React Markdown** - Renderização de Markdown

### Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/                    # Páginas Next.js (App Router)
│   │   ├── guias/             # Guias acadêmicos
│   │   ├── _blog/             # Sistema de blog
│   │   ├── _entidades/        # Organizações e laboratórios
│   │   ├── _projetos/         # Projetos de pesquisa
│   │   ├── _vagas/            # Vagas e oportunidades
│   │   ├── _usuarios/         # Perfis de usuários
│   │   └── _pesquisar/        # Funcionalidade de busca
│   ├── components/
│   │   ├── ui/                # Componentes Shadcn/ui
│   │   ├── shared/            # Componentes compartilhados
│   │   └── pages/             # Componentes específicos de páginas
│   ├── contexts/              # Contextos React (auth, search)
│   └── lib/                   # Utilitários e helpers
├── public/                    # Arquivos estáticos
└── package.json               # Dependências e scripts
```

### Funcionalidades Principais

- **📚 Guias Acadêmicos** - Conteúdo educacional estruturado
- **📝 Blog** - Publicações e artigos
- **🏢 Entidades** - Laboratórios e organizações
- **🔬 Projetos** - Projetos de pesquisa e desenvolvimento
- **💼 Vagas** - Oportunidades acadêmicas e profissionais
- **👥 Usuários** - Perfis e networking
- **🔍 Busca** - Sistema de busca integrado

## 🛠️ Qualidade de Código

### Ferramentas de Desenvolvimento

- **ESLint** - Análise estática de código
- **Prettier** - Formatação automática
- **TypeScript** - Verificação de tipos
- **Husky** - Git hooks para qualidade
- **Lint-staged** - Linting em arquivos staged

### Testes

- **Jest** - Testes unitários
- **Vitest** - Testes de integração
- **Playwright** - Testes end-to-end (E2E)
- **Testing Library** - Utilitários para testes React

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run build           # Build de produção
npm run start           # Servidor de produção

# Qualidade de código
npm run lint            # Verificar linting
npm run lint:fix        # Corrigir problemas de linting
npm run format          # Formatar código
npm run format:check    # Verificar formatação
npm run type-check      # Verificar tipos TypeScript
npm run check-all       # Executar todas as verificações

# Testes
npm run test            # Testes unitários
npm run test:watch      # Testes em modo watch
npm run test:coverage   # Testes com cobertura
npm run test:integration # Testes de integração
npm run test:e2e        # Testes end-to-end
npm run test:all        # Todos os testes
```

## 📋 Convenções do Projeto

### Idioma do Código

- **Código**: Inglês (variáveis, funções, comentários técnicos)
- **Documentação**: Português brasileiro
- **Commits**: Inglês
- **Interface**: Português brasileiro

### Estrutura de Arquivos

- **Componentes**: kebab-case (`user-card.tsx`)
- **Páginas**: kebab-case (`nova-vaga/page.tsx`)
- **Utilitários**: kebab-case (`format-date.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

### Organização de Componentes

```
components/
├── ui/                 # Componentes base (Shadcn/ui)
├── shared/             # Componentes reutilizáveis
└── pages/              # Componentes específicos de páginas
    ├── guias/
    ├── usuarios/
    └── vagas/
```

### Convenções de Nomenclatura

- **Componentes**: kebab-case (`user-profile.tsx`)
- **Hooks**: kebab-case com prefixo `use` (`use-auth.ts`)
- **Contextos**: kebab-case com sufixo `context` (`auth-context.tsx`)

## 🎨 Design System

### Tema

- **Modo Escuro/Claro** - Suporte completo a temas
- **Cores**: Paleta consistente baseada em Tailwind
- **Tipografia**: Inter (Google Font)
- **Componentes**: Shadcn/ui + Material-UI

### Responsividade

- **Mobile First** - Design responsivo
- **Breakpoints**: Tailwind CSS padrão
- **Componentes**: Adaptáveis a diferentes telas

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm 9+
- Git

### Instalação

```bash
# Clonar repositório
git clone <repository-url>
cd aquario

# Instalar dependências do frontend
cd frontend
npm install

# Iniciar desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 📚 Documentação Adicional

- **README-DEV.md** - Guia técnico detalhado para desenvolvedores
- **LINTING.md** - Regras e configurações de linting
- **Backend README-DEV** - Documentação da API

## 🤝 Contribuição

### Fluxo de Trabalho

1. **Fork** do repositório
2. **Branch** para nova funcionalidade (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** com mensagens claras (`git commit -m "feat: adiciona nova funcionalidade"`)
4. **Push** para branch (`git push origin feature/nova-funcionalidade`)
5. **Pull Request** para revisão

### Padrões de Commit

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação, sem mudança de código
- `refactor:` - Refatoração de código
- `test:` - Adição de testes
- `chore:` - Mudanças em build, dependências, etc.

### Checklist de Pull Request

- [ ] Código segue convenções do projeto
- [ ] Testes passam (`npm run test:all`)
- [ ] Linting passa (`npm run check-all`)
- [ ] Documentação atualizada
- [ ] Responsivo em diferentes telas
- [ ] Modo escuro/claro funcionando

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

## 👥 Equipe

Desenvolvido pela equipe do Centro de Informática da UFPB.

---

**Bem-vindo ao Aquário! 🌊**
