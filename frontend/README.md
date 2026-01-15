# 📘 Book Manager — Full-Stack Application

Uma aplicação completa para gerenciamento de livros com autenticação JWT e CRUD completo.

## 🚀 Demo Online

A aplicação está disponível online:
- **Frontend**: https://book-manager-desafio-full-stack.vercel.app
- **Backend**: Hospedado no Render
- **Banco de Dados**: PostgreSQL no Supabase

> ⚠️ **Atenção**: O backend está hospedado no plano gratuito do Render, que hiberna após períodos de inatividade. Na primeira requisição após a hibernação, pode haver um delay de 30-60 segundos até o servidor "acordar". Aguarde um momento e tente novamente caso encontre erro de timeout.

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js** - Framework React
- **TypeScript** - Linguagem
- **TailwindCSS** - Estilização
- **Axios** - Requisições HTTP

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


## 💻 Frontend (Next.js)

### 1. Navegue até a pasta do frontend

```bash
cd frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz da pasta `frontend` com o seguinte conteúdo:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Para produção (após deploy):**
```env
NEXT_PUBLIC_API_URL=https://seu-backend.render.com
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

---

## 🧪 Testando a Aplicação

### 1. Crie um usuário

Acesse `http://localhost:3000` e clique em "Criar conta"

### 2. Faça login

Use as credenciais criadas para fazer login

### 3. Gerencie livros

- Visualize a lista de livros
- Adicione novos livros
- Edite livros existentes
- Exclua livros
- Use a busca para filtrar por título

---

## 📄 Licença

Este projeto foi desenvolvido como desafio técnico.

---

## 🤝 Contribuindo

Sinta-se à vontade para abrir issues e pull requests!
