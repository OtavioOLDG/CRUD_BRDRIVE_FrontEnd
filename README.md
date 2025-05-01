# CRUD - Zoológico para a empresa BRDrive

# Sobre o projeto

O CRUD Zoológico é um sistema completo de gerenciamento de zoológicos que visa facilitar o controle e administração de animais e cuidadores (zookeepers). A aplicação foi projetada para fornecer uma interface eficiente e intuitiva para gerenciar dados de animais, como nome, espécie, idade, habitat, e o responsável por cada animal, além de permitir o gerenciamento de dados dos cuidadores, incluindo suas especialidades e dados pessoais.

## Backend (API)

### Disponível em [https://github.com/OtavioOLDG/CRUD_BRDRIVE_BackEnd](https://github.com/OtavioOLDG/CRUD_BRDRIVE_BackEnd)

O backend é desenvolvido com Node.js, utilizando o Fastify como framework para construção da API RESTful. A aplicação faz uso do Prisma como ORM (Object-Relational Mapping), o que facilita a interação com o banco de dados. A API permite o gerenciamento de dois principais modelos de dados: Animais e Cuidadores (Zookeepers).
Funcionalidades do Backend:

    Cadastro de animais: Permite cadastrar, editar, listar e excluir animais no zoológico.

    Cadastro de cuidadores: Permite registrar e gerenciar os dados dos cuidadores, incluindo sua especialidade.

    Relacionamento entre Animais e Cuidadores: Cada animal tem um cuidador responsável, e as operações da API permitem essa relação.

## Frontend (Interface)

### Disponível em [https://github.com/OtavioOLDG/CRUD_BRDRIVE_FrontEnd](https://github.com/OtavioOLDG/CRUD_BRDRIVE_FrontEnd)

O frontend do projeto é desenvolvido utilizando Next.js, React e TypeScript. A aplicação tem como objetivo criar uma interface moderna, fácil de usar e responsiva para que os administradores possam interagir com os dados do zoológico. A comunicação entre o frontend e o backend é feita por meio de requisições HTTP utilizando o fetch API.
Funcionalidades do Frontend:

    Página de listagem de animais: Exibe todos os animais cadastrados e permite a navegação para edição ou criação de novos animais.

    Página de listagem de cuidadores: Exibe todos os cuidadores e possibilita visualizar os detalhes de cada um.

    Cadastro de novos animais: Permite ao usuário criar novos registros de animais, selecionando um cuidador responsável para cada animal.

    Edição de animais e cuidadores: O usuário pode editar os dados de animais e cuidadores já existentes, atualizando as informações diretamente no banco de dados.

Tecnologias Utilizadas:

## Layout web

![Inicial](![alt text](/imagens/image2.png))

![/animals](![alt text](/imagens/image3.png))

![/animals/id](![alt text](/imagens/image4.png))

![/animals/id/editar](![alt text](/imagens/image5.png))

![/zookeepers](![alt text](/imagens/image6.png))

![/zookeepers/id](![alt text](/imagens/image7.png))

![/zookeepers/id/editar](![alt text](/imagens/image.png))

# Tecnologias utilizadas

## Back end

- Node.js: Para o ambiente de execução do código.
- Fastify: Framework para criação de APIs rápidas e eficientes.
- Prisma ORM: Para gerenciar o banco de dados com facilidade.
- Banco de dados (SQLite/PostgreSQL/MySQL): Para armazenamento persistente dos dados dos animais e cuidadores.

## Front end

- Next.js: Framework React para construção da interface e roteamento.
- React: Biblioteca para construção da interface de usuário (UI).
- TypeScript: Para adicionar tipagem estática e melhorar a manutenção do código.
- CSS Flexbox/Grid: Para layout responsivo e organização da interface.

## Implantação em produção

- Back end: Node.js, Prisma ORM e Fastify
- Front end web: Next.js e React
- Banco de dados: MySql

# Como executar o projeto

## Back end

Pré-requisitos: Node.js

```bash
# clonar repositório
git clone https://github.com/OtavioOLDG/CRUD_BRDRIVE_BackEnd

# após instale as dependências
npm install

# na mesma pasta que você clonou o projeto, crie um arquivo .env e cole o que está no .sample, substituindo o que for pertinente

# Execute as migrações do Prisma -> Para criar ou atualizar o esquema do banco de dados
npx prisma migrate dev

# executar o projeto
node src/server.js
```

## Front end web

Pré-requisitos: npm / yarn

```bash
# clonar repositório
git clone https://github.com/OtavioOLDG/CRUD_BRDRIVE_FrontEnd

# instalar dependências
npm install

# executar o projeto
npm run dev
```

# Autor

Otávio Lunardelii de Giacometti

https://www.linkedin.com/in/oldg/
