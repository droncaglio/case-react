# Case React Students CRUD Application

![Project Logo](path/to/logo.png) <!-- Optional: Add a logo if available -->

## Table of Contents

- [Descrição](#descrição)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Credenciais de Admin](#credenciais-de-admin)
- [Configuração e Instalação](#configuração-e-instalação)
  - [Pré-requisitos](#pré-requisitos)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Uso](#uso)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
  - [Backend `.env`](#backend-env)
  - [Frontend `.env`](#frontend-env)
- [Docker](#docker)
- [Licença](#licença)
- [Contato](#contato)

## Descrição

Este é um aplicativo CRUD (Create, Read, Update, Delete) para gerenciamento de estudantes, desenvolvido com Node.js, Next.js, PostgreSQL e Redis. O projeto serve como um case para uma vaga no Senai, demonstrando habilidades em desenvolvimento full-stack e integração de tecnologias modernas.

## Tecnologias

- **Backend**: Node.js, Express
- **Frontend**: Next.js, React
- **Banco de Dados**: PostgreSQL
- **Cache**: Redis
- **Autenticação**: JWT (JSON Web Tokens)
- **Containerização**: Docker, Docker Compose

## Estrutura do Projeto

```
projeto
├── backend
└── frontend
```

- **backend**: Contém todo o código do servidor, incluindo a API e a configuração do banco de dados.
- **frontend**: Contém a aplicação cliente construída com Next.js e React.

## Credenciais de Admin

Para utilizar a aplicação como administrador, utilize as seguintes credenciais:

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

## Configuração e Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/) (opcional, caso queira rodar sem Docker)

### Backend

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/droncaglio/case-react.git
   cd seu-repositorio/backend
   ```

2. **Crie um arquivo `.env` com as seguintes variáveis:**

   ```env
   ENVIRONMENT=development
   PORT=3000

   # PostgreSQL Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=password
   DB_NAME=case_react_node
   DB_DIALECT=postgres

   JWT_SECRET=chave-aleatoria
   ```

3. **Inicie os containers Docker para PostgreSQL e Redis:**

   ```bash
   docker-compose up -d
   ```

4. **Instale as dependências e inicie o servidor backend:**

   ```bash
   npm install
   npm run dev
   ```

   O backend estará rodando em [http://localhost:3000](http://localhost:3000).

### Frontend

1. **Navegue para a pasta frontend:**

   ```bash
   cd ../frontend
   ```

2. **Crie um arquivo `.env` com as seguintes variáveis:**

   ```env
   NODE_ENV=development

   APP_PORT=3001
   NEXT_PUBLIC_BASE_URL=
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXT_PUBLIC_PER_PAGE=20
   NEXT_PUBLIC_PROJECT_NAME=Case React Students
   NEXT_PUBLIC_PROJECT_DESCRIPTION=Projeto de Case da Vaga do Senai
   NEXT_PUBLIC_PROJECT_URL=
   ```

3. **Instale as dependências e inicie a aplicação frontend:**

   ```bash
   npm install
   npm run dev
   ```

   A aplicação frontend estará rodando em [http://localhost:3001](http://localhost:3001).

## Uso

1. **Acesse a aplicação frontend** em [http://localhost:3001](http://localhost:3001).
2. **Faça login** utilizando as credenciais de admin fornecidas acima.
3. **Gerencie os estudantes** através das funcionalidades CRUD disponíveis na interface.

## Variáveis de Ambiente

### Backend `.env`

```env
ENVIRONMENT=development
PORT=3000

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=case_react_node
DB_DIALECT=postgres

JWT_SECRET=97675ea3-df29-49dc-9bcd-a711bcee394b
```

### Frontend `.env`

```env
NODE_ENV=development

APP_PORT=3001
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_PER_PAGE=20
NEXT_PUBLIC_PROJECT_NAME=Case React Students
NEXT_PUBLIC_PROJECT_DESCRIPTION=Projeto de Case da Vaga do Senai
NEXT_PUBLIC_PROJECT_URL=
```

## Docker

Este projeto utiliza Docker para facilitar a configuração e o gerenciamento dos serviços de banco de dados e cache.

- **Iniciar os containers:**

  ```bash
  docker-compose up -d
  ```

- **Parar os containers:**

  ```bash
  docker-compose down
  ```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Para mais informações, sugestões ou dúvidas, entre em contato:

- **Email:** seuemail@example.com
- **LinkedIn:** [Seu LinkedIn](https://www.linkedin.com/in/seu-perfil/)
- **GitHub:** [seu-usuario](https://github.com/seu-usuario)

---

*Este README foi gerado com a ajuda do ChatGPT.*
