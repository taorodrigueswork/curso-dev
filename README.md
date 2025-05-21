# curso-dev

## Overview

This project is a Node.js/Next.js application using PostgreSQL as the database. It includes scripts for development, testing, linting, and database migrations.

## Main Libraries

- **next**: React framework for server-rendered apps.
- **react** & **react-dom**: UI library for building user interfaces.
- **pg**: PostgreSQL client for Node.js.
- **node-pg-migrate**: Database migration tool for PostgreSQL.
- **dotenv**: Loads environment variables from `.env` files.
- **dotenv-expand**: The purpose of dotenv-expand is to allow environment variables defined in your .env file to reference other variables in the same file. It expands variables like `${VAR_NAME}` inside your .env values, making it possible to compose environment variables from others.
- **jest**: JavaScript testing framework.
- **concurrently**: Run multiple commands concurrently.
- **prettier**: Code formatter.
- **async-retry**: Automatically retry asynchronous operations (like API calls or database queries) if they fail.
- **commitlint/cli**: https://commitlint.js.org/
- **commitlint/config-conventional**: https://commitlint.js.org/

## Scripts

| Script                | Description                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| `dev`                 | Starts Docker services, waits for PostgreSQL, runs migrations, and starts Next.js in dev mode.        |
| `services:up`         | Starts Docker services defined in `infra/compose.yaml`.                                               |
| `services:down`       | Stops and removes Docker services.                                                                    |
| `services:stop`       | Stops Docker services without removing them.                                                          |
| `lint:prettier:check` | Checks code formatting using Prettier.                                                                |
| `lint:prettier:fix`   | Fixes code formatting using Prettier.                                                                 |
| `lint:eslint:check`   |                                                                                                       |
| `test`                | Starts services, waits for PostgreSQL, runs Next.js and Jest tests concurrently, then stops services. |
| `test:watch`          | Runs Jest in watch mode.                                                                              |
| `migrations:create`   | Creates a new database migration using node-pg-migrate.                                               |
| `migrations:up`       | Applies all pending database migrations.                                                              |
| `wait-for-postgres`   | Waits for PostgreSQL to be ready before continuing.                                                   |

## Usage

### Development

```sh
npm run dev
```

### Running Tests

```sh
npm test
```

### Linting

```sh
npm run lint:check
npm run lint:fix
```

### Database Migrations

- **Create a migration:**
  ```sh
  npm run migrations:create
  ```
- **Apply migrations:**
  ```sh
  npm run migrations:up
  ```

### Docker Services

- **Start services:**
  ```sh
  npm run services:up
  ```
- **Stop services:**
  ```sh
  npm run services:stop
  ```
- **Remove services:**
  ```sh
  npm run services:down
  ```

## Environment Variables

Configure your PostgreSQL and other environment variables in `.env` or `.env.development`.

## Project Structure

- `infra/`: Infrastructure scripts, Docker Compose, and migrations.
- `pages/`: Next.js pages and API routes.
- `tests/`: Integration tests.

## Git Commands

- **Criar nova branch:**  
  `git checkout -b wait-for-postgres`
- **Ver status dos arquivos:**  
  `git status`
- **Adicionar em stage:**  
  `git add -A`
- **Fazer commit:**  
  `git commit -m 'add wait-for-postgres.js script'`
- **Empurrar alterações:**  
  `git push origin wait-for-postgres`
- **Mudar de branch:**  
  `git checkout main`
- **Atualizar branch:**  
  `git pull`
- **Ver branches:**  
  `git branch`
- **Deletar branch:**  
  `git branch -d wait-for-postgres`
- **Amend:**  
  `git commit --amend`
  `git commit --amend --no-edit`

## Commit Types using :

- **build:** Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci:** Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **docs:** Documentation only changes
- **feat:** A new feature
- **fix:** A bug fix
- **perf:** A code change that improves performance
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **test:** Adding missing tests or correcting existing tests

---

## NPM Commands

- **Instalar um pacote apenas como dependência de desenvolvimento:**  
  `npm install --save-dev concurrently`

---

## Dia 29 - Aula: Estabilizar "npm test" (Paralelismo)

## Biblioteca: [concurrently](https://www.npmjs.com/package/concurrently)

npm install --save-dev concurrently@8.2.2

- **concurrently:** Executa múltiplos comandos em paralelo no mesmo terminal.
- **--names next,jest:** Atribui os nomes "next" e "jest" aos processos para fácil identificação no output.
- **--hide next:** Oculta o output do processo chamado "next" (mostra apenas o do "jest").
- **--kill-others:** Se qualquer processo finalizar, todos os outros são encerrados.
- **--success command-jest:** O comando geral só é considerado bem-sucedido se o processo "jest" finalizar com sucesso.
- **'next dev':** Primeiro comando executado, inicia o servidor de desenvolvimento Next.js.
- **'jest --runInBand':** Segundo comando executado, roda os testes Jest em série (não em paralelo).

## Dia 29 - Aula: Estabilizar "npm test" (Orquestrador)

## Biblioteca: [async-retry](https://www.npmjs.com/package/async-retry)

npm install async-retry@1.3.3

async-retry is a JavaScript library that helps you automatically retry asynchronous operations (like API calls or database queries) if they fail, using customizable retry logic.

Key features:

- Retries a function if it throws an error or returns a rejected promise.
- Lets you configure the number of retries, delay between retries, and maximum timeout.
- Useful for handling temporary failures (e.g., network issues, services not ready).
