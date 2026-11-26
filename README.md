# ReparaFácil - Backend

API do ReparaFácil - Hugo Napoleão - PI 2026
Conecta clientes que precisam de reparos com profissionais locais.

## Links

- Site: https://reparafacilfrontend-main.vercel.app
- API: https://reparafacil-backend.onrender.com
- Front: https://github.com/Grupo-Reparafacil/Reparafacil_frontend

## Tecnologias

Node.js, 【entity-Express¦canonical_name=Express】, CORS, bcryptjs, jsonwebtoken, dotenv
Arquitetura: DTO + Controller + Routes + Store (em memória)

## Estrutura

src/
  server.js - sobe a API
  store.js - dados em memória (clientes, profissionais, avaliacoes)
  dtos/clientesDTO.js - valida e limpa os dados, nunca devolve senha
  controllers/authController.js - cadastro, login, perfil
  controllers/profissionalController.js - listar, buscar por id e por servico
  controllers/avaliacaoController.js - criar e listar avaliacoes
  rotas/auth.routes.js - rotas com prefixo /api

## Como rodar local

npm install
npm start
API em http://localhost:3001

## Variáveis .env

PORT=3001
JWT_SECRET=sua_chave_aqui

## Endpoints

POST /api/clientes - cadastro
POST /api/clientes/login - login
POST /api/cadastro - cadastro (alias)
POST /api/login - login (alias)
GET /api/profissionais?servico=&cidade= - busca e filtro
GET /api/profissional/perfil/:id - perfil
POST /api/avaliacoes - avaliar
GET /api/avaliacoes/:profissionalId - listar avaliacoes
GET /api/agendamentos - listar (agendamento real é via WhatsApp)

## Teste

Email: admin@reparafacil.com
Senha: 123456
