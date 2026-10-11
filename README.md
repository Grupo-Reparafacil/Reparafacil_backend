# ReparaFácil - API

## Definição das tecnologias back-end
- Node.js: Ambiente de execução JavaScript
- Express: Framework para criação da API REST  
- CORS: Liberação de acesso para o frontend
- Banco em memória: Mock para entrega Sprint 1 (próxima sprint: SQLite)

## Endpoints implementados
- POST /api/clientes - cadastro
- POST /api/clientes/login - login
- GET /api/profissionais?servico=&cidade= - busca e filtro
- GET /api/profissional/perfil/:id - ver perfil
- PUT /api/profissional/perfil/:id - atualizar perfil
- POST /api/agendamentos - criar agendamento
- GET /api/agendamentos - listar agendamentos
- POST /api/avaliacoes - avaliar profissional

## Como rodar
npm install
node src/server.js