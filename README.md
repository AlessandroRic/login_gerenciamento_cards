# Projeto de Sistema de Login e Gerenciamento de Cards

## Descrição
Este projeto é um exemplo prático que demonstra a implementação de um sistema de login com autenticação JWT, juntamente com um sistema de gerenciamento de cards. Utiliza os princípios da Clean Architecture e SOLID para uma organização estruturada e eficiente do código.

## Como Subir o Projeto

### Pré-requisitos
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

### Passos para Configuração

1. **Clone o Projeto**

    Primeiro, clone o repositório do GitHub para o seu ambiente local:

    ```
    git clone https://github.com/AlessandroRic/login_gerenciamento_cards
    ```

2. **Acesse a Pasta do Projeto**

    Após clonar o repositório, acesse a pasta do projeto:

    ```
    cd login_gerenciamento_cards/BACK
    ```

3. **Configuração do Arquivo de Ambiente (.env)**

    - Renomeie o arquivo `.env.example` para `.env`:

        ```
        mv .env.example .env
        ```

    - Se estiver usando uma versão do Linux, você pode usar o comando:

        ```
        cp .env.example .env
        ```

4. **Utilizando o Docker**

    - Se você já tiver o Docker instalado, execute o seguinte comando para construir e iniciar os containers:

        ```
        docker-compose up -d --build
        ```

### Executando Testes

- Os testes do sistema estão localizados na pasta `/tests`. Para executá-los, use o comando:

    ```
    docker exec -it gerenciamento_cards yarn test
    ```

### Lint

- Para rodar o lint no projeto, execute:

    ```
    docker exec -it gerenciamento_cards yarn lint
    ```

### Arquitetura de pastas e arquivos

### Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
projeto/
│
├── src/
│   ├── controllers/
│   │   ├── AuthController.ts
│   │   └── CardController.ts
│   │
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   └── loggingMiddleware.ts
│   │
│   ├── models/
│   │   └── Card.ts
│   │
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   └── cardRoutes.ts
│   │
│   ├── services/
│   │   ├── AuthService.ts
│   │   └── CardService.ts
│   │
│   └── types/
│       └── index.ts
│
├── app.ts
├── dataSource.ts
├── server.ts
│
├── tests/
│   ├── integration/
│   │   ├── authRoutes.test.ts
│   │   └── cardRoutes.test.ts
│   │
│   ├── unit/
│   │   ├── controllers/
│   │   │   ├── AuthController.test.ts
│   │   │   └── CardController.test.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.test.ts
│   │   │   └── logginMiddleware.test.ts
│   │   │
│   │   ├── models/
│   │   │   └── Card.test.ts
│   │   │
│   │   └── service/
│   │       ├── AuthService.test.ts
│   │       └── CardService.test.ts
```

- **controllers**: Contém os controladores para as ações de autenticação e gerenciamento de cards.
- **middleware**: Inclui os middlewares de autenticação e de registro de log.
- **models**: Contém os modelos de dados, como o modelo `Card`.
- **routes**: Define as rotas para autenticação e operações de cards.
- **services**: Inclui os serviços para autenticação e gerenciamento de cards.
- **types**: Armazena tipos personalizados usados em todo o projeto.