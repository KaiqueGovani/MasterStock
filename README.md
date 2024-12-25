
# MasterStock

MasterStock é uma aplicação para gerenciamento de estoque, oferecendo funcionalidades para login, visualização de produtos e geração de extratos. O projeto é dividido em duas partes principais: backend e frontend.

## Estrutura de Pastas

O projeto está organizado da seguinte forma:

```
└── KaiqueGovani-MasterStock/
    ├── backend/
    │   ├── .prettierrc
    │   ├── .gitignore
    │   ├── .eslintrc.js
    │   ├── test/
    │   │   ├── app.e2e-spec.ts
    │   │   └── jest-e2e.json
    │   ├── package.json
    │   ├── nest-cli.json
    │   ├── Dockerfile
    │   ├── tsconfig.json
    │   ├── package-lock.json
    │   ├── README.md
    │   ├── tsconfig.build.json
    │   └── src/
    │       ├── api/
    │       │   ├── payments/
    │       │   │   ├── payments.controller.spec.ts
    │       │   │   ├── payments.service.ts
    │       │   │   ├── dto/
    │       │   │   │   ├── update-payment.dto.ts
    │       │   │   │   └── create-payment.dto.ts
    │       │   │   ├── payments.service.spec.ts
    │       │   │   ├── payment.schema.ts
    │       │   │   ├── entities/
    │       │   │   │   ├── product-payment.entity.ts
    │       │   │   │   └── payment.entity.ts
    │       │   │   ├── payments.module.ts
    │       │   │   └── payments.controller.ts
    │       │   ├── auth/
    │       │   │   ├── auth.guard.spec.ts
    │       │   │   ├── auth.service.ts
    │       │   │   ├── auth.guard.ts
    │       │   │   ├── dto/
    │       │   │   │   ├── login.dto.ts
    │       │   │   │   └── generate-jwt-token.dto.ts
    │       │   │   ├── auth.controller.spec.ts
    │       │   │   ├── auth.module.ts
    │       │   │   ├── auth.controller.ts
    │       │   │   └── auth.service.spec.ts
    │       │   ├── qrcode/
    │       │   │   ├── qrcode.controller.spec.ts
    │       │   │   ├── dto/
    │       │   │   │   └── get-qrcode.dto.ts
    │       │   │   ├── mocks/
    │       │   │   │   ├── qrcode.mock.ts
    │       │   │   │   ├── qrcode3.mock.ts
    │       │   │   │   └── qrcode2.mock.ts
    │       │   │   └── qrcode.controller.ts
    │       │   ├── products/
    │       │   │   ├── dto/
    │       │   │   │   ├── create-product.dto.ts
    │       │   │   │   └── update-product.dto.ts
    │       │   │   ├── products.controller.ts
    │       │   │   ├── products.module.ts
    │       │   │   ├── entities/
    │       │   │   │   └── product.entity.ts
    │       │   │   ├── products.service.ts
    │       │   │   ├── product.schema.ts
    │       │   │   ├── products.service.spec.ts
    │       │   │   └── products.controller.spec.ts
    │       │   ├── dashboard/
    │       │   │   ├── dashboard.controller.ts
    │       │   │   ├── dashboard.module.ts
    │       │   │   ├── dashboard.controller.spec.ts
    │       │   │   ├── dashboard.service.spec.ts
    │       │   │   └── dashboard.service.ts
    │       │   └── users/
    │       │       ├── users.controller.spec.ts
    │       │       ├── dto/
    │       │       │   └── register.dto.ts
    │       │       ├── user.schema.ts
    │       │       ├── entities/
    │       │       │   └── user.entity.ts
    │       │       ├── users.service.ts
    │       │       ├── users.controller.ts
    │       │       ├── users.module.ts
    │       │       └── users.service.spec.ts
    │       ├── app.module.ts
    │       ├── main.ts
    │       ├── app.controller.spec.ts
    │       ├── common/
    │       │   ├── docs/
    │       │   │   └── document.factory.ts
    │       │   ├── error/
    │       │   │   └── operation.exception.ts
    │       │   └── database/
    │       │       ├── database.module.ts
    │       │       └── database.config.ts
    │       ├── app.controller.ts
    │       └── app.service.ts
    ├── frontend/
    │   ├── .vscode/
    │   │   ├── tasks.json
    │   │   ├── launch.json
    │   │   └── extensions.json
    │   ├── .gitignore
    │   ├── tsconfig.app.json
    │   ├── package.json
    │   ├── tsconfig.spec.json
    │   ├── proxy.conf.json
    │   ├── Dockerfile
    │   ├── tsconfig.json
    │   ├── package-lock.json
    │   ├── README.md
    │   ├── src/
    │   │   ├── index.html
    │   │   ├── styles.css
    │   │   ├── assets/
    │   │   │   └── .gitkeep
    │   │   ├── main.ts
    │   │   └── app/
    │   │       ├── app.routes.ts
    │   │       ├── app.config.ts
    │   │       ├── services/
    │   │       │   ├── produto.service.ts
    │   │       │   ├── escanear.service.ts
    │   │       │   ├── services.const.ts
    │   │       │   ├── dashboard.service.ts
    │   │       │   ├── verificar.service.ts
    │   │       │   ├── login.service.ts
    │   │       │   └── extrato.service.ts
    │   │       ├── paginas/
    │   │       │   ├── verificar-produtos/
    │   │       │   │   ├── verificar-produtos.component.css
    │   │       │   │   ├── verificar-produtos.component.ts
    │   │       │   │   └── verificar-produtos.component.html
    │   │       │   ├── dashboard/
    │   │       │   │   ├── dashboard.component.ts
    │   │       │   │   ├── dashboard.component.html
    │   │       │   │   └── dashboard.component.css
    │   │       │   ├── login/
    │   │       │   │   ├── login.component.html
    │   │       │   │   ├── login.component.css
    │   │       │   │   └── login.component.ts
    │   │       │   ├── extrato/
    │   │       │   │   ├── extrato.component.html
    │   │       │   │   ├── extrato.component.ts
    │   │       │   │   └── extrato.component.css
    │   │       │   └── produtos/
    │   │       │       ├── produtos.component.ts
    │   │       │       ├── produtos.component.html
    │   │       │       └── produtos.component.css
    │   │       ├── app.component.css
    │   │       ├── models/
    │   │       │   ├── produtosBot.model.ts
    │   │       │   ├── produtoBot.model.ts
    │   │       │   ├── token.model.ts
    │   │       │   ├── compra.model.ts
    │   │       │   ├── itensMenu.model.ts
    │   │       │   ├── opcaoProduto.model.ts
    │   │       │   ├── cadastro.model.ts
    │   │       │   ├── usuario.model.ts
    │   │       │   ├── produto.model.ts
    │   │       │   └── login.model.ts
    │   │       ├── enum/
    │   │       │   ├── opcaoProduto.enum.ts
    │   │       │   └── pagina.enum.ts
    │   │       ├── componentes/
    │   │       │   ├── sem-produtos/
    │   │       │   │   ├── sem-produtos.component.html
    │   │       │   │   ├── sem-produtos.component.ts
    │   │       │   │   └── sem-produtos.component.css
    │   │       │   ├── cabecalho/
    │   │       │   │   ├── cabecalho.component.ts
    │   │       │   │   ├── cabecalho.component.html
    │   │       │   │   └── cabecalho.component.css
    │   │       │   ├── loader/
    │   │       │   │   ├── loader.component.html
    │   │       │   │   ├── loader.component.css
    │   │       │   │   └── loader.component.ts
    │   │       │   ├── descricao-produto/
    │   │       │   │   ├── descricao-produto.component.css
    │   │       │   │   ├── descricao-produto.component.ts
    │   │       │   │   └── descricao-produto.component.html
    │   │       │   ├── confirmacao/
    │   │       │   │   ├── confirmacao.component.css
    │   │       │   │   ├── confirmacao.component.html
    │   │       │   │   └── confirmacao.component.ts
    │   │       │   ├── item-lista-compras/
    │   │       │   │   ├── item-lista-compras.component.css
    │   │       │   │   ├── item-lista-compras.component.ts
    │   │       │   │   └── item-lista-compras.component.html
    │   │       │   ├── menu-lateral/
    │   │       │   │   ├── menu-lateral.component.css
    │   │       │   │   ├── menu-lateral.component.html
    │   │       │   │   └── menu-lateral.component.ts
    │   │       │   ├── escanear/
    │   │       │   │   ├── escanear.component.ts
    │   │       │   │   ├── escanear.const.ts
    │   │       │   │   ├── escanear.component.html
    │   │       │   │   └── escanear.component.css
    │   │       │   ├── item-produtos/
    │   │       │   │   ├── item-produtos.component.css
    │   │       │   │   ├── item-produtos.component.ts
    │   │       │   │   └── item-produtos.component.html
    │   │       │   └── grafico-produto/
    │   │       │       ├── grafico-produto.component.css
    │   │       │       ├── grafico-produto.component.ts
    │   │       │       └── grafico-produto.component.html
    │   │       ├── interceptors/
    │   │       │   └── axios.interceptor.ts
    │   │       ├── guards/
    │   │       │   ├── auth.guard.ts
    │   │       │   └── confirmando.guard.ts
    │   │       ├── app.component.ts
    │   │       └── app.component.html
    │   ├── .editorconfig
    │   └── angular.json
    ├── docker-compose.yaml
    ├── .dockerignore
    ├── bot/
    │   ├── info.py
    │   ├── app.py
    │   ├── requirements.txt
    │   ├── Dockerfile
    │   └── webScraping.py
    └── README.md
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

## Funcionalidades do Projeto

### Backend

- **Autenticação:** Implementada no módulo `auth`, utilizando JWT para segurança.
- **Gerenciamento de Produtos:** Endpoints para criar, atualizar, deletar e listar produtos no módulo `produtos`.
- **Serviços Principais:** `app.service.ts` gerencia a lógica principal da aplicação, enquanto `auth.service.ts` e `produtos.service.ts` lidam com a autenticação e gerenciamento de produtos, respectivamente.

### Frontend

- **Login:** Página de login (`login.component.ts`) que autentica o usuário.
- **Dashboard de Produtos:** Página de produtos (`produtos.component.ts`) que exibe e gerencia os produtos.
- **Extratos:** Página de extrato (`extrato.component.ts`) que mostra o histórico de transações.
- **Componentes Reutilizáveis:** Componentes de cabeçalho e rodapé para navegação consistente.
- **Serviços:** Serviços como `auth.service.ts` para autenticação, `produtos.service.ts` para produtos e `extrato.service.ts` para extratos que fazem a comunicação com o backend via HTTP.

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
