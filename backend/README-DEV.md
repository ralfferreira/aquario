# 🚀 Aquário Backend - Guia de Desenvolvimento

Este guia cobre tudo que você precisa saber para desenvolver e executar o backend do Aquário localmente.

## 📋 Pré-requisitos

Antes de começar a desenvolver, certifique-se de ter o seguinte instalado:

### Software Obrigatório

| Software           | Versão | Propósito                   | Instalação                                                                |
| ------------------ | ------ | --------------------------- | ------------------------------------------------------------------------- |
| **Node.js**        | 18+    | Runtime JavaScript          | [Download em nodejs.org](https://nodejs.org/)                             |
| **npm**            | 9+     | Gerenciador de pacotes      | Vem com o Node.js                                                         |
| **Docker Desktop** | Latest | Container do banco de dados | [Download em docker.com](https://www.docker.com/products/docker-desktop/) |
| **Git**            | Latest | Controle de versão          | [Download em git-scm.com](https://git-scm.com/)                           |

### Opcional mas Recomendado

| Software          | Propósito                   | Instalação                                                          |
| ----------------- | --------------------------- | ------------------------------------------------------------------- |
| **VS Code**       | Editor de código            | [Download em code.visualstudio.com](https://code.visualstudio.com/) |
| **Postman**       | Teste de APIs               | [Download em postman.com](https://www.postman.com/downloads/)       |
| **Prisma Studio** | Navegador do banco de dados | Integrado ao projeto (`npm run db:studio`)                          |

### Requisitos do Sistema

- **macOS**: 10.15+ (Catalina ou superior)
- **Windows**: Windows 10+ com WSL2
- **Linux**: Ubuntu 18.04+ ou equivalente
- **RAM**: 8GB mínimo, 16GB recomendado
- **Armazenamento**: 2GB de espaço livre

### Comandos de Verificação

Execute estes comandos para verificar sua configuração:

```bash
# Verificar versão do Node.js (deve ser 18+)
node --version

# Verificar versão do npm (deve ser 9+)
npm --version

# Verificar versão do Docker
docker --version

# Verificar versão do Docker Compose
docker-compose --version

# Verificar versão do Git
git --version
```

### Configuração do Docker

1. **Instale o Docker Desktop** em [docker.com](https://www.docker.com/products/docker-desktop/)
2. **Inicie o Docker Desktop**
3. **Verifique se o Docker está rodando**:
   ```bash
   docker info
   ```
   Deve mostrar informações do sistema Docker sem erros

### Configuração do Node.js

1. **Instale o Node.js** em [nodejs.org](https://nodejs.org/) (versão LTS recomendada)
2. **Verifique a instalação**:
   ```bash
   node --version  # Deve mostrar v18.x.x ou superior
   npm --version   # Deve mostrar 9.x.x ou superior
   ```

### Dependências do Projeto

O projeto instalará automaticamente suas dependências quando você executar os comandos de configuração. Nenhuma instalação manual necessária!

---

## 📋 Início Rápido

### Configuração Inicial

```bash
# 1. Navegue até o diretório backend
cd backend

# 2. Configuração completa (Docker + Banco + Migrações + Dados de Exemplo + Servidor Dev)
npm run setup
```

### Desenvolvimento Diário

```bash
# Início rápido (gerencia Docker, DB, inicia servidor dev)
npm run dev:auto

# Ou se você sabe que tudo está rodando
npm run dev
```

## 🛠️ Comandos Disponíveis

### Comandos de Desenvolvimento

| Comando            | O que faz                                                                                           | Quando usar                       |
| ------------------ | --------------------------------------------------------------------------------------------------- | --------------------------------- |
| `npm run dev`      | Servidor dev puro com hot reload (assume que DB está rodando)                                       | Quando DB já está rodando         |
| `npm run dev:auto` | Configuração automática + servidor dev (desenvolvimento diário)                                     | **Mais comum - trabalho diário**  |
| `npm run setup`    | Configuração completa do backend + servidor dev + dados de exemplo (primeira vez ou reset completo) | Primeira vez ou problemas maiores |

### Comandos de Produção

| Comando         | O que faz                                            | Quando usar        |
| --------------- | ---------------------------------------------------- | ------------------ |
| `npm run build` | Compilar TypeScript para JavaScript para produção    | Antes da produção  |
| `npm run start` | Servidor de produção (requer npm run build primeiro) | Deploy de produção |

### Comandos de Banco de Dados

| Comando             | O que faz                                                           | Quando usar                    |
| ------------------- | ------------------------------------------------------------------- | ------------------------------ |
| `npm run migrate`   | Processo completo de migração (validar → formatar → migrar → gerar) | **Quando você muda o schema**  |
| `npm run db:studio` | Abrir interface web para navegar/editar banco de dados              | Debug de dados                 |
| `npm run db:seed`   | Popular banco de dados com dados de exemplo                         | Adicionar dados de teste       |
| `npm run db:reset`  | Dropar banco, recriar, aplicar migrações (DESTRUTIVO!)              | Começar do zero (apenas dev)   |
| `npm run db:status` | Mostrar quais migrações foram aplicadas                             | Verificar status das migrações |

### Comandos de Qualidade de Código

| Comando                | O que faz                                              | Quando usar                          |
| ---------------------- | ------------------------------------------------------ | ------------------------------------ |
| `npm run lint`         | Verificar problemas de código (ESLint)                 | Antes de commitar código             |
| `npm run lint:fix`     | Corrigir automaticamente problemas de código possíveis | Corrigir problemas automaticamente   |
| `npm run format`       | Formatar código com Prettier                           | Padronizar formatação do código      |
| `npm run format:check` | Verificar se código está formatado corretamente        | Verificar formatação antes do commit |

## 🏗️ Estrutura do Projeto

```
backend/
├── scripts/                    # Scripts shell para automação
│   ├── migrate.sh             # Processo completo de migração
│   ├── quick-start.sh         # Início rápido do dev
│   └── start-backend.sh       # Configuração completa + servidor dev
├── src/
│   ├── domain/                # Entidades e repositórios do domínio
│   ├── application/           # Casos de uso e lógica de negócio
│   ├── infra/                 # Infraestrutura (HTTP, Banco de dados)
│   └── scripts/
│       └── seed.ts            # Script de seeding do banco
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── migrations/            # Arquivos de migração do banco
└── package.json               # Dependências e scripts
```

## 🗄️ Configuração do Banco de Dados

### Pré-requisitos

- **Docker Desktop** deve estar rodando
- **Container PostgreSQL** será iniciado automaticamente

### Variáveis de Ambiente

Os scripts criam automaticamente um arquivo `.env` com:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/aquario?schema=public"
```

### Comandos de Banco Explicados

#### `npm run migrate` (Recomendado)

Processo completo de migração que:

1. ✅ Valida sintaxe do schema
2. ✅ Formata arquivo do schema
3. ✅ Cria arquivos de migração
4. ✅ Aplica migrações ao banco
5. ✅ Gera tipos TypeScript

#### `npm run db:reset` (DESTRUTIVO!)

⚠️ **Use apenas em desenvolvimento!** Isso irá:

- Dropar banco inteiro
- Recriar banco
- Aplicar todas as migrações
- Executar script de seed

#### `npm run db:seed`

Popula banco com dados de exemplo:

- Campus e Centros
- Cursos (Ciência da Computação, etc.)
- Usuários (Thais, Itamar, Tadea, etc.)
- Entidades (ARIA, TAIL)
- **Guias de Exemplo** com seções e subseções

## 🔧 Fluxo de Desenvolvimento

### 1. Mudanças no Schema

Quando você modificar `prisma/schema.prisma`:

```bash
npm run migrate  # Processo completo
```

### 2. Adicionando Novos Dados

Para popular com dados de teste:

```bash
npm run db:seed
```

### 3. Debug do Banco

Para navegar/editar dados visualmente:

```bash
npm run db:studio
# Abre http://localhost:5555
```

### 4. Desenvolvimento Diário

```bash
npm run dev:auto  # Gerencia tudo automaticamente
```

### 5. Qualidade de Código

Antes de commitar código, execute:

```bash
# Verificar problemas de código
npm run lint

# Corrigir problemas automaticamente
npm run lint:fix

# Formatar código
npm run format

# Verificar se está formatado
npm run format:check
```

## 📝 Guia Completo de Migrações

### Quando Fazer Migrações

Você precisa executar migrações quando:

- ✅ **Adicionar nova tabela** (model)
- ✅ **Adicionar nova coluna** (campo)
- ✅ **Modificar tipo de coluna**
- ✅ **Adicionar/modificar relacionamentos**
- ✅ **Adicionar índices**
- ✅ **Modificar constraints**

### Processo Passo a Passo

#### 1. Modificar o Schema

Edite o arquivo `prisma/schema.prisma`:

```prisma
// Exemplo: Adicionar nova tabela
model NovaTabela {
  id        String   @id @default(uuid())
  nome      String
  criadoEm  DateTime @default(now())

  @@map("nova_tabela")
}
```

#### 2. Executar Migração

```bash
npm run migrate
```

Este comando faz automaticamente:

1. ✅ **Valida** sintaxe do schema
2. ✅ **Formata** arquivo do schema
3. ✅ **Cria** arquivo de migração
4. ✅ **Aplica** migração ao banco
5. ✅ **Gera** tipos TypeScript

#### 3. Verificar Resultado

```bash
# Verificar se migração foi aplicada
npm run db:status

# Ver dados no banco
npm run db:studio
```

### Exemplos Práticos

#### Adicionar Nova Coluna

```prisma
model Usuario {
  id        String   @id @default(uuid())
  nome      String
  email     String   @unique
  telefone  String?  // ← Nova coluna adicionada
  criadoEm  DateTime @default(now())
}
```

#### Adicionar Nova Tabela com Relacionamento

```prisma
model Categoria {
  id        String   @id @default(uuid())
  nome      String
  produtos  Produto[] // ← Relacionamento

  @@map("categorias")
}

model Produto {
  id          String     @id @default(uuid())
  nome        String
  categoriaId String
  categoria   Categoria  @relation(fields: [categoriaId], references: [id])

  @@map("produtos")
}
```

#### Adicionar Índice

```prisma
model Usuario {
  id        String   @id @default(uuid())
  nome      String
  email     String   @unique

  @@index([nome])  // ← Índice adicionado
  @@map("usuarios")
}
```

### Comandos de Migração Disponíveis

| Comando               | O que faz                                                   | Quando usar                             |
| --------------------- | ----------------------------------------------------------- | --------------------------------------- |
| `npm run migrate`     | **Processo completo** (validar → formatar → migrar → gerar) | **Mudanças no schema**                  |
| `npm run db:migrate`  | Apenas criar e aplicar migrações                            | Se você quer pular validação/formatação |
| `npm run db:generate` | Apenas gerar tipos TypeScript                               | Se tipos estão desatualizados           |
| `npm run db:status`   | Verificar status das migrações                              | Para debug                              |
| `npm run db:reset`    | **DESTRUTIVO!** Resetar banco completo                      | Problemas graves (apenas dev)           |

### Solução de Problemas com Migrações

#### "Migration drift detected"

```bash
# Schema fora de sincronia
npm run db:reset  # Resetar tudo (DESTRUTIVO!)
```

#### "Prisma client not generated"

```bash
# Tipos desatualizados
npm run migrate  # Processo completo
```

#### "Schema validation failed"

```bash
# Erro de sintaxe no schema
# Verificar arquivo prisma/schema.prisma
# Corrigir sintaxe e executar novamente
npm run migrate
```

### Boas Práticas

1. **✅ Sempre use `npm run migrate`** - Processo completo e seguro
2. **✅ Teste em desenvolvimento** antes de aplicar em produção
3. **✅ Backup do banco** antes de migrações importantes
4. **✅ Commits pequenos** - Uma mudança por migração
5. **✅ Documente mudanças** importantes no commit

## 🐳 Gerenciamento do Docker

### Comandos Manuais do Docker

```bash
# Iniciar banco de dados
docker-compose up -d

# Parar banco de dados
docker-compose down

# Ver logs
docker-compose logs

# Reiniciar banco de dados
docker-compose restart
```

### Verificação de Status do Docker

Os scripts verificam automaticamente se o Docker está rodando e o iniciam se necessário.

## 🔍 Solução de Problemas

### Problemas Comuns

#### "Cannot connect to Docker daemon"

```bash
# Iniciar aplicação Docker Desktop
open -a Docker
# Aguardar 10-15 segundos, depois tentar novamente
```

#### "Can't reach database server"

```bash
# Banco não está rodando
npm run dev:auto  # Iniciará Docker + DB automaticamente
```

#### "Environment variable not found: DATABASE_URL"

```bash
# Arquivo .env ausente
npm run dev:auto  # Criará .env automaticamente
```

#### "Migration drift detected"

```bash
# Schema do banco fora de sincronia
npm run db:reset  # Começar do zero (DESTRUTIVO!)
```

#### "Prisma client not generated"

```bash
# Tipos desatualizados
npm run migrate  # Gerará tipos
```

### Obtendo Ajuda

1. **Verificar status do Docker**: `docker info`
2. **Verificar logs do banco**: `docker-compose logs`
3. **Verificar status das migrações**: `npm run db:status`
4. **Resetar tudo**: `npm run db:reset` (apenas dev)

## 📊 Endpoints da API

### Servidor de Desenvolvimento

- **URL**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

### Módulos Disponíveis

- `/guias` - Gerenciamento de guias
- `/usuarios` - Gerenciamento de usuários
- `/cursos` - Gerenciamento de cursos
- `/centros` - Gerenciamento de centros
- `/campus` - Gerenciamento de campus
- `/entidades` - Gerenciamento de entidades
- `/projetos` - Gerenciamento de projetos
- `/vagas` - Vagas de emprego
- `/publicacoes` - Publicações
- `/itens-achados-perdidos` - Achados e perdidos
- `/pesquisar` - Funcionalidade de busca

## 🎯 Dicas Importantes de Desenvolvimento

### 1. Use `dev:auto` para Trabalho Diário

```bash
npm run dev:auto  # Gerencia Docker, DB, servidor dev
```

### 2. Mudanças no Schema Sempre Use `migrate`

```bash
npm run migrate  # Processo completo
```

### 3. Debug com Prisma Studio

```bash
npm run db:studio  # Navegador visual do banco
```

### 4. Teste com Dados de Seed

```bash
npm run db:seed  # Popular com exemplos
```

### 5. Começar do Zero Quando Necessário

```bash
npm run db:reset  # Opção nuclear (apenas dev)
```

## 🔄 Hot Reload

O servidor de desenvolvimento (`npm run dev` ou `npm run dev:auto`) inclui:

- ✅ **Hot reload** - Reinicia quando arquivos mudam
- ✅ **Compilação TypeScript** - Compilação em tempo real
- ✅ **Relatório de erros** - Mensagens de erro claras
- ✅ **Início rápido** - Otimizado para desenvolvimento

## 📝 Adicionando Novas Funcionalidades

### 1. Mudanças no Banco

1. Modificar `prisma/schema.prisma`
2. Executar `npm run migrate`
3. Atualizar script de seed se necessário

### 2. Novos Endpoints da API

1. Criar entidades do domínio
2. Criar interfaces de repositório
3. Criar casos de uso
4. Criar controladores
5. Adicionar rotas
6. Registrar em server.ts

### 3. Testando Mudanças

1. Usar `npm run db:studio` para verificar dados
2. Testar endpoints com Postman/curl
3. Verificar logs para erros

---

## 🚀 Referência Rápida

```bash
# Desenvolvimento diário
npm run dev:auto

# Mudanças no schema
npm run migrate

# Debug do banco
npm run db:studio

# Adicionar dados de teste
npm run db:seed

# Começar do zero (apenas dev)
npm run db:reset
```

**Boa programação! 🎉**
