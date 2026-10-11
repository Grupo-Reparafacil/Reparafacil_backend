require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/auth.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Documentação das tecnologias
app.get('/', (req, res) => {
  res.json({
    projeto: "ReparaFácil API - Hugo Napoleão - PI 2026",
    tecnologias: "Node.js, Express, CORS, bcryptjs, jsonwebtoken, dotenv",
    endpoints: [
      "POST /api/clientes - cadastro",
      "POST /api/clientes/login - login",
      "GET /api/profissionais?servico=&cidade= - busca e filtro",
      "GET /api/profissional/perfil/:id - perfil",
      "PUT /api/profissional/perfil/:id - atualizar perfil",
      "POST /api/agendamentos - criar agendamento",
      "GET /api/agendamentos - listar agendamentos",
      "POST /api/avaliacoes - avaliar",
      "GET /api/avaliacoes/:profissionalId - listar avaliacoes"
    ]
  });
});

app.use('/api', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT} - SECRET no .env - Hugo Napoleão 2026`));