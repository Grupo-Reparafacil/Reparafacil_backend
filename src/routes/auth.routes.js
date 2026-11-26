const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");
const profissional = require("../controllers/profissionalController");
const avaliacao = require("../controllers/avaliacaoController");

router.post("/cadastro", auth.cadastrar);
router.post("/clientes", auth.cadastrar);
router.post("/login", auth.login);
router.post("/clientes/login", auth.login);
router.get("/perfil/:id", auth.perfil);
router.get("/clientes/:id", auth.perfil);

router.get("/profissionais", profissional.listar);
router.get("/profissionais/busca", profissional.buscarPorServico);
router.get("/profissionais/:id", profissional.buscarPorId);
router.get("/profissional/perfil/:id", profissional.buscarPorId);

router.get("/avaliacoes/:profissionalId", avaliacao.listarPorProfissional);
router.post("/avaliacoes", avaliacao.criar);

router.get("/agendamentos", (req, res) => res.json([]));
router.post("/agendamentos", (req, res) => res.status(201).json({ ok: true, mensagem: "Agendamento via WhatsApp" }));

module.exports = router;
