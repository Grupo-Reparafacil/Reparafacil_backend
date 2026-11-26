const 【entity-express¦canonical_name=express】 = require("【entity-express¦canonical_name=express】");
const router = 【entity-express¦canonical_name=express】.Router();

const auth = require("../controllers/authController");
const profissional = require("../controllers/profissionalController");
const avaliacao = require("../controllers/avaliacaoController");

// Auth - caminho novo + caminho antigo que o front ja usava
router.post("/cadastro", auth.cadastrar);
router.post("/clientes", auth.cadastrar);
router.post("/login", auth.login);
router.post("/clientes/login", auth.login);
router.get("/perfil/:id", auth.perfil);
router.get("/clientes/:id", auth.perfil);

// Profissionais
router.get("/profissionais", profissional.listar);
router.get("/profissionais/busca", profissional.buscarPorServico);
router.get("/profissionais/:id", profissional.buscarPorId);
router.get("/profissional/perfil/:id", profissional.buscarPorId);

// Avaliacoes
router.get("/avaliacoes/:profissionalId", avaliacao.listarPorProfissional);
router.post("/avaliacoes", avaliacao.criar);

// Agendamentos - so pra nao dar Failed to fetch, agendamento real e por WhatsApp
router.get("/agendamentos", (req, res) => res.json([]));
router.post("/agendamentos", (req, res) => res.status(201).json({ ok: true, mensagem: "Agendamento via WhatsApp" }));

module.exports = router;
