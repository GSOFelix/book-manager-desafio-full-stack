# 📘 Book Manager — Full-Stack Application

Uma aplicação completa para gerenciamento de livros com autenticação JWT e CRUD completo.

## 🚀 Demo Online

A aplicação está disponível online:
- **Frontend**: https://book-manager-desafio-full-stack.vercel.app
- **Backend**: Hospedado no Render
- **Banco de Dados**: PostgreSQL no Supabase

> ⚠️ **Atenção**: O backend está hospedado no plano gratuito do Render, que hiberna após períodos de inatividade. Na primeira requisição após a hibernação, pode haver um delay de 30-60 segundos até o servidor "acordar". Aguarde um momento e tente novamente caso encontre erro de timeout.

## 🛠️ Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem
- **Prisma** - ORM
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Hash de senhas

## 📋 Funcionalidades

- ✅ Autenticação com JWT
- ✅ Registro de usuários
- ✅ CRUD completo de livros
- ✅ Busca de livros por título
- ✅ Proteção de rotas
- ✅ Interface responsiva

---

## 🔧 Configuração e Execução Local

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- PostgreSQL instalado e rodando

---

## 🗄️ Backend (NestJS)

### 1. Navegue até a pasta do backend

```bash
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz da pasta `backend` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/bookmanager?schema=public"
JWT_SECRET="sua_chave_secreta_aqui"
JWT_EXPIRES="7h" <- exemplo
```

**Explicação da string de conexão PostgreSQL:**

```
postgresql://[USUARIO]:[SENHA]@[HOST]:[PORTA]/[NOME_DO_BANCO]?schema=public
```

**Exemplo com valores reais:**
```env
DATABASE_URL="postgresql://postgres:minhasenha@localhost:5432/bookmanager?schema=public"
```

- **USUARIO**: usuário do PostgreSQL (padrão: `postgres`)
- **SENHA**: senha do usuário
- **HOST**: endereço do servidor (local: `localhost`)
- **PORTA**: porta do PostgreSQL (padrão: `5432`)
- **NOME_DO_BANCO**: nome do banco de dados (ex: `bookmanager`)

### 4. Configure o Prisma

Inicialize o Prisma (caso ainda não tenha sido feito):

```bash
npx prisma init
```

### 5. Execute as migrations

Crie as tabelas no banco de dados:

```bash
npx prisma migrate dev --name init
```

Este comando irá:
- Criar as tabelas no banco de dados
- Gerar os tipos TypeScript do Prisma

### 6. Gere o Prisma Client

```bash
npx prisma generate
```

### 7. (Opcional) Visualize o banco de dados

Para abrir o Prisma Studio e visualizar os dados:

```bash
npx prisma studio
```

### 8. Inicie o servidor

```bash
npm run start:dev
```

O backend estará rodando em `http://localhost:3001`
---

## 🔐 Endpoints da API

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/auth/register` | Criar novo usuário |
| POST | `/auth/login` | Fazer login e receber token JWT |

### Livros (requer autenticação)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/books` | Listar todos os livros  paginado `?page=1` (com busca opcional `?search=termo`) |
| POST | `/books` | Criar novo livro |
| GET | `/books/:id` | Buscar livro por ID |
| PUT | `/books/:id` | Atualizar livro |
| DELETE | `/books/:id` | Remover livro |

---

## 📄 Licença

Este projeto foi desenvolvido como desafio técnico.

---

## 🤝 Contribuindo

Sinta-se à vontade para abrir issues e pull requests!
