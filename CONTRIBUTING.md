# 🤝 Guia de Contribuição - Aquário

Bem-vindo ao **Aquário**! Ficamos muito felizes que você tenha interesse em contribuir com o projeto! 🎉

## 🌊 Sobre o Projeto

O Aquário é um projeto **open source** desenvolvido por e para a comunidade do **Centro de Informática da UFPB**. Nossa missão é criar uma plataforma que centralize informações e facilite a vida acadêmica de todos os estudantes, professores e laboratórios do CI.

### 👥 Quem Pode Contribuir?

**Qualquer pessoa do CI pode contribuir!** Você não precisa fazer parte do time principal para ajudar. Seja você:

- 🎓 **Estudante de qualquer período** - sua perspectiva é valiosa
- 👨‍🏫 **Professor ou pesquisador** - seu conhecimento enriquece o projeto
- 🔬 **Membro de laboratório** - suas necessidades moldam as funcionalidades
- 💡 **Alguém com uma ideia** - todas as sugestões são bem-vindas

Todos são bem-vindos para contribuir, independente do seu nível de experiência em programação!

### 🤝 Nossa Forma de Trabalhar

Temos um **time fixo** que mantém o projeto, mas **estamos sempre atentos e abertos** a:

- ✅ **Pull Requests** de qualquer pessoa da comunidade
- ✅ **Issues** reportando bugs ou sugerindo melhorias
- ✅ **Sugestões** de novas funcionalidades
- ✅ **Feedback** sobre o que está funcionando (ou não)
- ✅ **Discussões** sobre direção do projeto

**Todas as contribuições são revisadas com cuidado e carinho!** Mesmo que você nunca tenha contribuído para um projeto open source, não se preocupe - estamos aqui para ajudar você a começar.

### 💬 Quer Conversar com a Gente?

**Fique à vontade para entrar em contato!** Seja para:

- Tirar dúvidas sobre como contribuir
- Discutir uma ideia antes de implementar
- Pedir ajuda com configuração do ambiente
- Simplesmente bater um papo sobre o projeto
- Sugerir melhorias ou novas funcionalidades

Você pode nos encontrar através de:

- **Issues no GitHub**: Para discussões técnicas e públicas
- **Email**: [ralf.ferreira@academico.ufpb.br](mailto:ralf.ferreira@academico.ufpb.br)
- **Pull Requests**: Até mesmo para fazer perguntas!

Não tenha vergonha de perguntar - todos começamos de algum lugar, e adoramos ajudar novos contribuidores! 🚀

---

## 📋 Índice

1. [Código de Conduta](#código-de-conduta)
2. [Como Posso Contribuir?](#como-posso-contribuir)
3. [Configuração do Ambiente](#configuração-do-ambiente)
4. [Fluxo de Trabalho](#fluxo-de-trabalho)
5. [Padrões de Código](#padrões-de-código)
6. [Nomenclatura de Branches](#nomenclatura-de-branches)
7. [Padrões de Commit](#padrões-de-commit)
8. [Pull Requests](#pull-requests)
9. [Testes](#testes)
10. [Documentação](#documentação)

---

## 📜 Código de Conduta

Ao participar deste projeto, você concorda em manter um ambiente respeitoso e inclusivo para todos. Esperamos que todos os contribuidores:

- Sejam respeitosos e profissionais
- Aceitem críticas construtivas
- Foquem no que é melhor para a comunidade
- Demonstrem empatia com outros membros da comunidade

## 🎯 Como Posso Contribuir?

Existem várias maneiras de contribuir com o Aquário:

### 🐛 Reportando Bugs

Encontrou um bug? Ajude-nos a corrigi-lo:

1. **Verifique** se o bug já não foi reportado nas [issues](https://github.com/ralfferreira/aquario/issues)
2. **Abra uma nova issue** com:
   - Título claro e descritivo
   - Descrição detalhada do problema
   - Passos para reproduzir o bug
   - Comportamento esperado vs comportamento atual
   - Screenshots (se aplicável)
   - Informações do ambiente (OS, versão do navegador, etc.)

### 💡 Sugerindo Melhorias

Tem uma ideia para melhorar o Aquário?

1. **Verifique** se a sugestão já não foi feita
2. **Abra uma issue** com a tag `enhancement` incluindo:
   - Descrição clara da melhoria
   - Justificativa e casos de uso
   - Possíveis implementações (opcional)

### 🔧 Contribuindo com Código

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Configure** seu ambiente de desenvolvimento
4. **Crie uma branch** para sua feature/correção
5. **Desenvolva** seguindo nossos padrões
6. **Teste** suas alterações
7. **Commit** suas mudanças
8. **Push** para seu fork
9. **Abra um Pull Request**

### 📝 Melhorando a Documentação

Documentação é fundamental! Você pode ajudar:

- Corrigindo erros de digitação ou gramática
- Melhorando explicações existentes
- Adicionando exemplos
- Traduzindo documentação
- Criando tutoriais

---

## ⚙️ Configuração do Ambiente

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** 18+ ([nodejs.org](https://nodejs.org/))
- **npm** 9+
- **Git** ([git-scm.com](https://git-scm.com/))
- **Docker Desktop** ([docker.com](https://www.docker.com/products/docker-desktop/)) - apenas para backend

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/ralfferreira/aquario.git
cd aquario

# 2. Configure o Backend
cd backend
npm install
npm run setup  # Configura Docker + DB + Migrações + Dados de exemplo

# 3. Configure o Frontend (em outro terminal)
cd frontend
npm install
npm run dev
```

### Verificação

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Prisma Studio**: http://localhost:5555 (quando rodando)

Para mais detalhes, consulte:

- [README-DEV.md](README-DEV.md) - Guia principal de desenvolvimento
- [frontend/README-DEV.md](frontend/README-DEV.md) - Guia específico do frontend
- [backend/README-DEV.md](backend/README-DEV.md) - Guia específico do backend

---

## 🔄 Fluxo de Trabalho

### 1. Antes de Começar

```bash
# Atualize sua branch main local
git checkout main
git pull origin main
```

### 2. Crie uma Nova Branch

```bash
# Crie uma branch seguindo a convenção de nomenclatura
git checkout -b tipo/nome-descritivo-da-feature
```

### 3. Desenvolva

```bash
# Frontend
cd frontend
npm run dev

# Backend (em outro terminal)
cd backend
npm run dev:auto
```

### 4. Verifique a Qualidade do Código

```bash
# Frontend
cd frontend
npm run check-all    # Lint + Format + TypeCheck
npm run test:all     # Todos os testes

# Backend
cd backend
npm run lint         # Verificar linting
npm run format       # Formatar código
npm run migrate      # Se alterou o schema do DB
npm test            # Executar testes
```

### 5. Commit e Push

```bash
# Adicione as alterações
git add .

# Commit seguindo a convenção
git commit -m "tipo: descrição clara da mudança"

# Push para seu fork
git push origin tipo/nome-descritivo-da-feature
```

### 6. Abra um Pull Request

1. Acesse seu fork no GitHub
2. Clique em "Compare & pull request"
3. Preencha o template de PR
4. Aguarde o code review

---

## 📐 Padrões de Código

### Idioma no Código

- **Código** (variáveis, funções, comentários técnicos): **Inglês**
- **Documentação**: **Português Brasileiro**
- **Commits**: **Inglês**
- **Interface do usuário**: **Português Brasileiro**

### Frontend

#### Convenções de Nomenclatura

```typescript
// ✅ Arquivos de componentes: kebab-case
// user-profile.tsx, search-bar.tsx, guide-card.tsx

// ✅ Componentes: PascalCase
export function UserProfile() { ... }
export function SearchBar() { ... }

// ✅ Variáveis e funções: camelCase
const userData = { ... }
function handleSubmit() { ... }

// ✅ Constantes: UPPER_SNAKE_CASE
const MAX_ITEMS = 100
const API_BASE_URL = "..."

// ✅ Props sempre tipadas
interface UserProfileProps {
  userId: string
  onUpdate?: () => void
}
```

#### Estrutura de Componentes

```typescript
// ✅ Componente bem estruturado
interface ComponentProps {
  // Props tipadas
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // 1. Hooks
  const [state, setState] = useState()

  // 2. Funções auxiliares
  const handleAction = () => { ... }

  // 3. Effects
  useEffect(() => { ... }, [])

  // 4. Render
  return (
    <div className={cn('base-classes', className)}>
      {/* conteúdo */}
    </div>
  )
}
```

#### Estilização

```typescript
// ✅ Use Tailwind CSS
<div className="flex items-center gap-4 p-4 rounded-lg">

// ✅ Use cn() para classes condicionais
import { cn } from '@/lib/utils'

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  className
)}>
```

### Backend

#### Arquitetura DDD

O backend segue Domain-Driven Design (DDD):

```
backend/src/
├── domain/          # Entidades e regras de negócio
├── application/     # Casos de uso
└── infra/          # Implementações (HTTP, Database)
```

#### Convenções de Nomenclatura

```typescript
// ✅ Entidades do Domínio: PascalCase
export class User { ... }
export class Guide { ... }

// ✅ Repositórios: Interface + Implementação
export interface UserRepository { ... }
export class PrismaUserRepository implements UserRepository { ... }

// ✅ Casos de Uso: PascalCase + Use/UseCase
export class CreateUser { ... }
export class FindUserById { ... }

// ✅ DTOs: PascalCase + DTO
export interface CreateUserDTO { ... }
```

#### Criação de Novas Features

1. **Domain**: Crie entidade e repositório
2. **Application**: Implemente casos de uso
3. **Infrastructure**: Implemente repositório e controllers
4. **Routes**: Adicione rotas em `infra/http/routes`

### Qualidade de Código

```bash
# Frontend
npm run check-all     # Verifica tudo
npm run lint:fix      # Corrige linting
npm run format        # Formata código

# Backend
npm run lint          # Verifica linting
npm run lint:fix      # Corrige linting
npm run format        # Formata código
```

---

## 🌿 Nomenclatura de Branches

A nomenclatura correta de branches é essencial para manter o projeto organizado e facilitar a compreensão do que está sendo desenvolvido.

### Estrutura da Branch

```
tipo/nome-descritivo-da-feature
```

### Tipos de Branch

| Tipo        | Descrição                | Exemplo                              |
| ----------- | ------------------------ | ------------------------------------ |
| `feature/`  | Nova funcionalidade      | `feature/sistema-busca-guias`        |
| `fix/`      | Correção de bug          | `fix/erro-validacao-login`           |
| `refactor/` | Refatoração de código    | `refactor/otimizacao-user-card`      |
| `docs/`     | Documentação             | `docs/atualizar-readme`              |
| `test/`     | Adição de testes         | `test/api-guias`                     |
| `chore/`    | Manutenção geral         | `chore/atualizar-dependencias`       |
| `style/`    | Formatação e estilo      | `style/ajustar-espacamento-navbar`   |
| `perf/`     | Melhorias de performance | `perf/otimizar-carregamento-imagens` |

### Regras para Nomenclatura

1. **Sempre use o tipo apropriado** seguido de `/`
2. **Use kebab-case** (palavras separadas por hífen)
3. **Seja descritivo** - o nome deve conter o nome da feature ou o que está sendo alterado
4. **Use nomes em português** para features específicas do projeto
5. **Mantenha conciso mas informativo** (máximo 50 caracteres recomendado)

### ✅ Exemplos Bons

```bash
feature/cadastro-laboratorios
feature/filtros-busca-vagas
fix/correcao-upload-foto-perfil
fix/validacao-campo-email
refactor/estrutura-componentes-guias
docs/guia-contribuicao
test/integracao-api-usuarios
chore/configurar-ci-cd
perf/lazy-loading-imagens
```

### ❌ Exemplos Ruins

```bash
❌ minha-feature              # Falta o tipo
❌ feature/fix                # Nome não descritivo
❌ feature_novo_cadastro      # Use hífen, não underscore
❌ feature/CADASTRO           # Não use maiúsculas
❌ feature/sistema-super-completo-de-gerenciamento-de-usuarios-com-permissoes  # Muito longo
❌ fix/bug                    # Não descritivo - qual bug?
```

### Branches Especiais

- `main` - Branch principal, sempre estável
- `develop` - Branch de desenvolvimento (se aplicável)
- `hotfix/` - Correções urgentes em produção

### Trabalhando com Branches

```bash
# Criar e mudar para nova branch
git checkout -b feature/nome-da-feature

# Verificar branch atual
git branch

# Mudar de branch
git checkout nome-da-branch

# Listar todas as branches
git branch -a

# Deletar branch local (após merge)
git branch -d feature/nome-da-feature

# Atualizar branch com main
git checkout main
git pull origin main
git checkout feature/nome-da-feature
git rebase main
```

### Dicas Importantes

- **Uma branch = Uma funcionalidade/correção**: Não misture múltiplas funcionalidades em uma única branch
- **Mantenha atualizado**: Atualize regularmente sua branch com a `main`
- **Delete após merge**: Branches antigas poluem o repositório
- **Nome descritivo ajuda code review**: Facilita para os revisores entenderem o propósito

---

## 📝 Padrões de Commit

Usamos **Conventional Commits** para manter um histórico limpo e semântico.

### Estrutura

```
tipo: descrição curta

[corpo opcional]

[rodapé opcional]
```

### Tipos de Commit

| Tipo       | Descrição                          | Exemplo                                               |
| ---------- | ---------------------------------- | ----------------------------------------------------- |
| `feat`     | Nova funcionalidade                | `feat: add search system for guides`                  |
| `fix`      | Correção de bug                    | `fix: resolve validation error in login form`         |
| `docs`     | Documentação                       | `docs: update README with new instructions`           |
| `style`    | Formatação (sem mudança de código) | `style: format code with prettier`                    |
| `refactor` | Refatoração                        | `refactor: improve performance of UserCard component` |
| `test`     | Adição de testes                   | `test: add unit tests for API guides`                 |
| `chore`    | Manutenção                         | `chore: update dependencies`                          |
| `perf`     | Performance                        | `perf: optimize image loading`                        |

### Regras

1. **Use inglês** para commits
2. **Primeira linha**: máximo 72 caracteres
3. **Modo imperativo**: "add" não "added" ou "adds"
4. **Sem pontuação final** na primeira linha
5. **Corpo opcional**: para explicações detalhadas
6. **Referência a issues**: `fixes #123` ou `closes #456`

### ✅ Exemplos Bons

```bash
feat: add laboratory registration system
fix: resolve image upload error in profile
docs: update contribution guide
refactor: simplify authentication logic
test: add integration tests for user API
chore: configure ESLint rules
perf: implement lazy loading for images
```

### ❌ Exemplos Ruins

```bash
❌ Added new feature                    # Use modo imperativo
❌ feat: adiciona sistema de busca      # Use inglês
❌ fix bug                              # Não descritivo, falta ":"
❌ feat: Add super complex system...    # Primeira letra maiúscula, muito longo
❌ updated files                        # Falta tipo
```

### Commits Detalhados

Para mudanças complexas, use corpo e rodapé:

```bash
feat: add advanced search filters

Implement filtering system for job postings including:
- Filter by type (internship, research, etc.)
- Filter by lab/professor
- Date range selection

Closes #123
```

---

## 🔍 Pull Requests

### Antes de Abrir um PR

#### Checklist Obrigatório

- [ ] **Código segue os padrões estabelecidos**
  - [ ] Convenções de nomenclatura respeitadas
  - [ ] Arquitetura DDD seguida (backend)
  - [ ] Componentes bem estruturados (frontend)
- [ ] **Qualidade de código**
  - [ ] Linting passa (`npm run check-all` no frontend)
  - [ ] TypeScript sem erros
  - [ ] Prettier aplicado
  - [ ] Sem console.logs desnecessários
- [ ] **Testes**
  - [ ] Testes passam (`npm run test:all`)
  - [ ] Cobertura adequada
  - [ ] Novos testes para nova funcionalidade
- [ ] **Documentação**
  - [ ] README atualizado se necessário
  - [ ] Comentários em código complexo
  - [ ] JSDoc para funções públicas
- [ ] **Funcionalidade**
  - [ ] Testado em diferentes resoluções
  - [ ] Modo escuro/claro funcionando
  - [ ] Integração frontend/backend testada
  - [ ] Sem warnings no console

### Estrutura do PR

#### Título

Use o mesmo padrão dos commits:

```
tipo: descrição clara da mudança
```

#### Descrição

Use o template que será automaticamente aplicado:

```markdown
## Descrição

Breve descrição das mudanças realizadas.

## Tipo de Mudança

- [ ] 🐛 Bug fix
- [ ] ✨ Nova feature
- [ ] 📝 Documentação
- [ ] 🎨 Estilo/UI
- [ ] ♻️ Refatoração
- [ ] ⚡ Performance
- [ ] ✅ Testes

## Como Testar

1. Passo 1
2. Passo 2
3. Resultado esperado

## Screenshots (se aplicável)

[Adicione screenshots para mudanças visuais]

## Issues Relacionadas

Fixes #123
Closes #456

## Checklist

- [ ] Testes passando
- [ ] Linting passando
- [ ] Documentação atualizada
- [ ] Code review solicitado
```

### Processo de Review

1. **Abra o PR** com descrição completa
2. **Aguarde o review** de pelo menos um mantenedor
3. **Responda aos comentários** de forma construtiva
4. **Faça as alterações** solicitadas
5. **Atualize o PR** com novos commits ou force-push após rebase
6. **Aguarde aprovação** final
7. **Merge** será feito por um mantenedor

### Dicas para PRs Melhores

- **Mantenha PRs pequenos**: Mais fáceis de revisar
- **Um PR = Uma funcionalidade**: Não misture múltiplas features
- **Responda rapidamente**: Facilita o processo de review
- **Seja receptivo**: Code review é para melhorar o código
- **Atualize sua branch**: Mantenha sincronizada com `main`
- **Teste localmente**: Antes de push

---

## 🧪 Testes

Testes são obrigatórios para garantir a qualidade do código.

### Frontend

#### Tipos de Teste

```bash
# Testes unitários (Jest)
npm run test

# Testes em modo watch
npm run test:watch

# Testes de integração (Vitest)
npm run test:integration

# Testes E2E (Playwright)
npm run test:e2e

# Todos os testes
npm run test:all

# Cobertura
npm run test:coverage
```

#### Estrutura de Testes

```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Backend

```bash
# Testes unitários e integração
npm test

# Testes em modo watch
npm run test:watch

# Cobertura
npm run test:coverage
```

### Cobertura de Testes

- **Mínimo esperado**: 70% de cobertura
- **Meta**: 80%+ para código crítico
- **Obrigatório**: Testes para novas funcionalidades

### O Que Testar

#### Frontend

- ✅ Renderização de componentes
- ✅ Interações do usuário
- ✅ Lógica de estado
- ✅ Validações de formulário
- ✅ Fluxos críticos (E2E)

#### Backend

- ✅ Casos de uso
- ✅ Validações de entidade
- ✅ Endpoints da API
- ✅ Lógica de negócio
- ✅ Tratamento de erros

---

## 📚 Documentação

### Documentando Código

#### JSDoc para Funções Públicas

```typescript
/**
 * Busca guias por curso
 * @param courseId - ID do curso
 * @param filters - Filtros opcionais de busca
 * @returns Array de guias encontrados
 * @throws {NotFoundError} Quando curso não existe
 */
export async function findGuidesByCourse(
  courseId: string,
  filters?: SearchFilters
): Promise<Guide[]> {
  // implementação
}
```

#### Comentários em Código Complexo

```typescript
// ✅ Bom: explica o "porquê"
// Using debounce to prevent excessive API calls during typing
const debouncedSearch = useMemo(() => debounce(handleSearch, 300), []);

// ❌ Ruim: explica o óbvio
// Set loading to true
setLoading(true);
```

### README e Documentação

Ao adicionar novas features:

1. **Atualize README** se a feature é importante
2. **Documente API** em arquivos apropriados
3. **Adicione exemplos** de uso quando relevante
4. **Mantenha consistência** com documentação existente

---

## 🎯 Princípios Fundamentais

### 1. Consistência

- Siga os padrões estabelecidos
- Mantenha convenções de nomenclatura
- Use as ferramentas de qualidade configuradas

### 2. Qualidade

- Testes são obrigatórios
- Código limpo e legível
- Performance importa

### 3. Documentação

- Código auto-documentado quando possível
- Comentários em lógica complexa
- READMEs atualizados

### 4. Colaboração

- Commits claros e descritivos
- PRs bem documentados
- Code review respeitoso e construtivo

---

## 🆘 Precisa de Ajuda?

### Documentação

- [README.md](README.md) - Visão geral do projeto
- [README-DEV.md](README-DEV.md) - Guia principal de desenvolvimento
- [frontend/README-DEV.md](frontend/README-DEV.md) - Guia do frontend
- [backend/README-DEV.md](backend/README-DEV.md) - Guia do backend
- [frontend/TESTING-GUIDE.md](frontend/TESTING-GUIDE.md) - Guia completo de testes

### Comunidade

- **Issues**: [github.com/ralfferreira/aquario/issues](https://github.com/ralfferreira/aquario/issues)
- **Discussions**: Use GitHub Discussions para perguntas
- **Email**: [ralf.ferreira@academico.ufpb.br](mailto:ralf.ferreira@academico.ufpb.br)

---

## 🎉 Reconhecimento

Todos os contribuidores são reconhecidos e valorizados! Suas contribuições ajudam a tornar o Aquário melhor para toda a comunidade acadêmica.

![Contributors](https://contrib.rocks/image?repo=ralfferreira/aquario&anon=1)

---

**Obrigado por contribuir com o Aquário! 🌊**

_Juntos, estamos construindo uma plataforma melhor para a comunidade acadêmica do CI-UFPB._
