# Javascript API Rest

## Descrição

API RESTFULL para um sistema de blog.

## Initial env Settings

execute `$ yarn`
va para src/config/env/ copie e renomeie arquivo .env.example para .env
execute `$ yarn appSecretGenerate segredo` , copie o hash para dentro da variável APP_SECRET dentro do arquivo .env

## Configuração do banco NoSQL (MongoDB)

  [Site Oficial do MongoDB](https://www.mongodb.com/download-center/community)
  - Siga as instruções para baixar e instalar o banco na sua máquina local;
  - execute `$ mongo` no terminal para iniciar o shell do mongo
  - execute o comandos a seguir dentro do shell do mongo `use database_name`
  - `db.create({user: "username",pwd:"userpassword",roles:"readWrite",db:"databasename"})`, lembre-se de trocar os valores de `username`,`pwd` e `databasename`
  - Agora instancie as credencias do mongodb dentro do arquivo .env nas respectivas variaveis do banco

## Configuração do Redis

[Redis Server](https://redis.io/download)

- Baixe e configure o redis na sua maquina local
- Instacie o arquivo .env com as credenciais (Obs: O .env.example já possui as credencias padrões)

## Iniciar o modo desenvolvedor

Execute `$ yarn dev`

## Construir e Executar o servidor de produção

Execute `$ yarn prod`

## Rodar os testes unitários e integrados

Execute `$ yarn test`

## Instruções para operar a aplicação

Usando de um client REST (Insomnia, Postman, etc...), construa requisições para cada entidade (Artigo, Comentário e Autor) usando cada método (GET, POST, PUT, DELETE) e um POST Request de sessão para ativar o jsonwebtoken

baseURL = "http://localhost:3000"

### STORE Autor
{
  url: baseURL/authors,
  method: POST,
  data:{
    name: string,
    email: string,
    password: string
  }
}

### Listagem de Autores

{
  url: baseURL/authors,
  method: GET
}

### Busca de Autor por id

{
  url: baseURL/authors/:id,
  method: GET
}

### UPDATE Autor
{
  url: baseURL/authors/:id,
  method: PUT,
  data:{
    name: string,
    email: string,
    password: string
  }
}

### DELETE Autor

{
  url: baseURL/authors/:id,
  method: DELETE,
}

### Listagem de Artigos

{
  url: baseURL/articles,
  method: GET
}

### Busca de Artigo por Id

{
  url: baseURL/articles/:id,
  method: GET
}

### STORE Artigo

{
  url: baseURL/articles,
  method: POST,
  data:{
    title: string,
    subTitle: string,
    context: string,
    authors:[ AuthorIdA, AuthorIdB, etc... ]
  }
}

### UPDATE Artigo

{
  url: baseURL/articles/:id,
  method: PUT,
  data:{
    title: string,
    subTitle: string,
    context: string,
    authors:[ AuthorIdA, AuthorIdB, etc... ]
  }
}

### DELETE Artigo

{
  url: baseURL/articles/:id,
  method: DELETE,
}


### Listagem de Comentário
{
  url: baseURL/comments,
  method: GET
}

### Busca de Comentário por Id

{
  url: baseURL/comments/:id,
  method: GET
}

### STORE Comentário

{
  url: baseURL/comments,
  method: POST,
  data:{
    context: string
  }
}

### UPDATE Comentário

{
  url: baseURL/comments/:id,
  method: PUT,
  data:{
    context: string
  }
}

### DELETE Comentário

{
  url: baseURL/comments/:id,
  method: DELETE,
  headers: {
    authorization: string
  }
}

Obs: Para deletar o comentário deve ser repassado um jwt gerado pela rota /sessions abaixo

### GET JWT TOKEN SESSION

{
  url: baseURL/sessions
  method: POST,
  data:{
    "email": string,
    "password": string
  }
}

Após a requisição de sessão, será enviado os dados do autor mais um token de authenticação, a autenticação utiliza do protocolo de Bearer Token no headers da requisição.

ex: headers: {
  authentication: "Bearer Token"
}

Somente a autenticação do autor em que o comentário foi registrado que poderá apagar o comentário

## Lista de TODOS do desafio

