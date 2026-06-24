# API de Autenticação e RBAC com Node.js

## Visão Geral
Este projeto é um sistema backend desenvolvido com Node.js, apresentando microsserviços simulados, autenticação via JWT, controle de acesso baseado em funções (RBAC - Role-Based Access Control) e um banco de dados SQLite. Ele foi desenvolvido como implementação base para uma prova prática focada em microsserviços e segurança.

## Tecnologias Utilizadas
* **Node.js e Express**: Framework principal para construção da API REST.
* **SQLite e sqlite3**: Banco de dados leve para armazenamento de usuários e funções (roles).
* **bcryptjs**: Criptografia (hashing) de senhas para armazenamento seguro.
* **jsonwebtoken (JWT)**: Mecanismo de autenticação sem estado (stateless).
* **dotenv**: Gerenciamento de variáveis de ambiente.
* **CORS**: Middleware para compartilhamento de recursos de origem cruzada.

## Estrutura do Projeto
A aplicação segue um padrão de arquitetura limpa, separando responsabilidades em:
* src/config/: Configurações do banco de dados e da aplicação.
* src/models/: Estruturas de dados representando Entidades (Usuário, Função).
* src/repositories/: Camada de acesso a dados que abstrai as consultas ao SQLite.
* src/services/: Regras de negócio principais.
* src/controllers/: Manipuladores de requisições e respostas HTTP.
* src/middlewares/: Middlewares do Express para Autenticação e Tratamento de Erros.
* src/routes/: Definições dos endpoints da API.

## Configuração e Instalação

1. Clone o repositório e navegue até o diretório do projeto:
```bash
cd prova-backend

```

2. Instale as dependências:

```bash
npm install

```

3. Configure as Variáveis de Ambiente:
Crie um arquivo .env no diretório raiz baseado na seguinte configuração:

```env
PORT=3000
JWT_SECRET=prova_secret_key_2024
JWT_EXPIRES_IN=1h

```

4. Execute a Aplicação:
Para iniciar o servidor em modo de desenvolvimento (usando nodemon):

```bash
npm run dev

```

Para iniciar normalmente:

```bash
npm start

```

Nota: O banco de dados SQLite (prova.db) e as funções padrão serão inicializados automaticamente ao iniciar o servidor pela primeira vez.

---

## Endpoints da API

### Rotas de Autenticação

#### 1. Registrar Usuário

Cria um novo usuário no sistema.

* URL: POST /auth/register
* Headers: Content-Type: application/json
* Body:
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456",
  "role": "CUSTOMER"
}

```



#### 2. Login

Autentica um usuário e retorna um token JWT.

* URL: POST /auth/login
* Headers: Content-Type: application/json
* Body:
```json
{
  "email": "joao@email.com",
  "password": "123456"
}

```



### Rotas de Usuário e Protegidas

Requer cabeçalho: Authorization: Bearer 

#### 3. Obter Perfil

Recupera os dados do perfil do usuário logado.

* URL: GET /users/me

#### 4. Atualizar Perfil

Atualiza as informações de perfil do usuário logado.

* URL: PUT /users/profile
* Body:
```json
{
  "name": "João Silva Atualizado",
  "role": "ADMINISTRATOR"
}

```



#### 5. Testar Endpoint de Cliente

Rota protegida acessível por ambas as funções CUSTOMER e ADMINISTRATOR.

* URL: GET /users/test/customer

#### 6. Testar Endpoint de Administrador

Rota protegida estritamente acessível pela função ADMINISTRATOR.

* URL: GET /users/test/admin

```

```