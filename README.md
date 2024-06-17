
# MasterStock

MasterStock é uma aplicação para gerenciamento de estoque, oferecendo funcionalidades para login, visualização de produtos e geração de extratos. O projeto é dividido em duas partes principais: backend e frontend.

## Estrutura de Pastas

O projeto está organizado da seguinte forma:

```
MasterStock-main/
├── backend/                # Backend do projeto
│   ├── src/                # Código-fonte principal do backend
│   │   ├── api/            # Endpoints da API
│   │   ├── app.controller.ts   # Controlador principal
│   │   ├── app.module.ts       # Módulo principal
│   │   ├── app.service.ts      # Serviço principal
│   │   ├── main.ts             # Arquivo de entrada da aplicação
│   ├── Dockerfile            # Dockerfile para o backend
│   ├── nest-cli.json         # Configuração do NestJS
│   ├── package.json          # Dependências e scripts do backend
│   ├── tsconfig.build.json   # Configuração de build do TypeScript
│   ├── tsconfig.json         # Configuração do TypeScript
├── frontend/               # Frontend do projeto
│   ├── src/                # Código-fonte principal do frontend
│   │   ├── app/            # Componentes e serviços do Angular
│   │   │   ├── componentes/   # Componentes Angular
│   │   │   ├── paginas/       # Páginas do Angular
│   │   │   ├── services/      # Serviços do Angular
│   ├── angular.json        # Configuração do Angular
│   ├── Dockerfile          # Dockerfile para o frontend
│   ├── package.json        # Dependências e scripts do frontend
├── docker-compose.yaml     # Arquivo para orquestração dos containers Docker
└── README.md               # Documentação do projeto
```

## Configuração e Instalação

### Requisitos

- Node.js
- Docker
- Docker Compose

### Instalação

#### Backend

1. Navegue até a pasta `backend`:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente. Renomeie o arquivo `.env.example` para `.env` e preencha as informações necessárias.

#### Frontend

1. Navegue até a pasta `frontend`:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente. Renomeie o arquivo `src/environments/environment.example.ts` para `src/environments/environment.ts` e preencha as informações necessárias.

## Execução do Projeto

### Backend

1. Navegue até a pasta `backend`:
   ```bash
   cd backend
   ```
2. Execute o servidor de desenvolvimento:
   ```bash
   npm run start:dev
   ```
3. O backend estará disponível em `http://localhost:3000`.

#### Scripts Disponíveis no Backend

- `start`: Inicia a aplicação.
- `start:dev`: Inicia a aplicação em modo de desenvolvimento.
- `build`: Compila a aplicação.
- `test`: Executa os testes automatizados.
- `lint`: Verifica o código-fonte em busca de problemas de estilo.

### Frontend

1. Navegue até a pasta `frontend`:
   ```bash
   cd frontend
   ```
2. Execute o servidor de desenvolvimento:
   ```bash
   ng serve
   ```
3. Abra o navegador e acesse `http://localhost:4200`.

#### Scripts Disponíveis no Frontend

- `ng serve`: Inicia o servidor de desenvolvimento do Angular.
- `build`: Compila a aplicação Angular.
- `test`: Executa os testes automatizados.
- `lint`: Verifica o código-fonte em busca de problemas de estilo.

## Configuração do Docker

Para facilitar a execução do projeto, você pode utilizar o Docker.

### Executar com Docker Compose

1. Na raiz do projeto, execute:
   ```bash
   docker-compose up --build
   ```
2. Isso irá construir e iniciar os containers para o backend e o frontend.
3. O frontend estará disponível em `http://localhost:4200` e o backend em `http://localhost:3000`.

### Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
