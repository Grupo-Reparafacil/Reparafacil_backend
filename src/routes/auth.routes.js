const 【entity-express¦canonical_name=express】 = require("【entity-express¦canonical_name=express】");
const router = 【entity-express¦canonical_name=express】.Router();

const auth = require("../controllers/authController");
const profissional = require("../controllers/profissionalController");
const avaliacao = require("../controllers/avaliacaoController");

// Auth - cliente
router.post("/cadastro", auth.cadastrar);
router.post("/login", auth.login);
router.get("/perfil/:id", auth.perfil);

// Profissionais
router.get("/profissionais", profissional.listar);
router.get("/profissionais/busca", profissional.buscarPorServico);
router.get("/profissionais/:id", profissional.buscarPorId);

// Avaliacoes
router.get("/avaliacoes/:profissionalId", avaliacao.listarPorProfissional);
router.post("/avaliacoes", avaliacao.criar);

module.exports = router;
