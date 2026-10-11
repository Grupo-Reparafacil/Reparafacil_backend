const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = "REPARAFACIL-PROJETO-2026-PI";

// BANCO FAKE - HUGO NAPOLEÃO - PI / TERESINA
let clientes = [];
let profissionais = [
  {id:1, nome:"Carlos Silva", prof:"Elétrica", cat:"Elétrica", bairro:"Centro", local:"Centro, Teresina - PI • 8 anos", img:"https://i.pravatar.cc/150?img=11", nota:"4,8 (120)", whatsapp:"5586988881111", preco:"80", disponivel: true},
  {id:2, nome:"João Pereira", prof:"Encanamento", cat:"Encanamento", bairro:"Dirceu", local:"Dirceu, Teresina - PI • 12 anos", img:"https://i.pravatar.cc/150?img=15", nota:"4,9 (89)", whatsapp:"5586988882222", preco:"90", disponivel: true},
  {id:3, nome:"Maria Santos", prof:"Pintura", cat:"Pintura", bairro:"Fátima", local:"Fátima, Teresina - PI • 6 anos", img:"https://i.pravatar.cc/150?img=5", nota:"4,7 (55)", whatsapp:"5586988883333", preco:"120", disponivel: true},
  {id:4, nome:"Pedro Costa", prof:"Marcenaria", cat:"Marcenaria", bairro:"Mocambinho", local:"Mocambinho, Teresina - PI • 10 anos", img:"https://i.pravatar.cc/150?img=12", nota:"5,0 (210)", whatsapp:"5586988884444", preco:"200", disponivel: true},
];
let agendamentos = [];
let avaliacoes = [];

// Cria admin com HASH - Hugo Napoleão
(async () => {
  const hash = await bcrypt.hash("123456", 8);
  clientes.push({ id: 1, nome: "Admin", email: "admin@reparafacil.com", senha: hash, cidade: "Hugo Napoleão - PI" });
})();

// Cadastro com HASH
router.post('/clientes', async (req, res) => {
  const { nome, email, senha, cidade } = req.body;
  if (!nome ||!email ||!senha) return res.status(400).json({erro: "Preencha nome, email e senha"});
  if (clientes.find(c => c.email === email)) return res.status(400).json({erro: "Email já existe"});

  const hash = await bcrypt.hash(senha, 8);
  const novo = { id: clientes.length+1, nome, email, senha: hash, cidade: cidade || "Hugo Napoleão - PI" };
  clientes.push(novo);

  const {senha: _,...semSenha} = novo;
  console.log("Novo cliente cadastrado:", semSenha);
  res.status(201).json(semSenha);
});

// Login com HASH + JWT
router.post('/clientes/login', async (req, res) => {
  const { email, senha } = req.body;
  const cliente = clientes.find(c => c.email === email);
  if (!cliente) return res.status(401).json({erro: "Credenciais inválidas"});

  const senhaOk = await bcrypt.compare(senha, cliente.senha);
  if (!senhaOk) return res.status(401).json({erro: "Credenciais inválidas"});

  const token = jwt.sign({id: cliente.id, email: cliente.email}, SECRET, {expiresIn: "1d"});
  const {senha: _,...semSenha} = cliente;
  res.json({ mensagem: "Login OK", cliente: semSenha, token });
});

// Busca com filtros
router.get('/profissionais', (req, res) => {
  const { cat, bairro, busca, servico, cidade } = req.query;
  let resultado = profissionais;

  if(cat && cat!== 'Todas' && cat!== 'Todas categorias') {
    resultado = resultado.filter(p => p.cat.toLowerCase().includes(cat.toLowerCase().trim()));
  }
  if(bairro && bairro!== 'Todos' && bairro!== 'Localização') {
    resultado = resultado.filter(p => p.bairro.toLowerCase().includes(bairro.toLowerCase()));
  }
  if(busca) {
    resultado = resultado.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()) || p.prof.toLowerCase().includes(busca.toLowerCase()));
  }
  if(servico) resultado = resultado.filter(p => p.prof.toLowerCase().includes(servico.toLowerCase()));
  if(cidade) resultado = resultado.filter(p => p.local.toLowerCase().includes(cidade.toLowerCase()));

  const temToken = req.headers.authorization;
  if(!temToken){
    const publico = resultado.map(({whatsapp,...resto}) => resto);
    return res.json(publico);
  }
  res.json(resultado);
});

// Perfil
router.get('/profissional/perfil/:id', (req, res) => {
  const prof = profissionais.find(p => p.id == req.params.id);
  if(!prof) return res.status(404).json({erro: "Não encontrado"});
  const av = avaliacoes.filter(a => a.profissionalId == req.params.id);
  res.json({...prof, avaliacoes: av});
});

router.put('/profissional/perfil/:id', (req, res) => {
  const index = profissionais.findIndex(p => p.id == req.params.id);
  if(index === -1) return res.status(404).json({erro: "Não encontrado"});
  profissionais[index] = {...profissionais[index],...req.body };
  res.json(profissionais[index]);
});

// Agendamentos
router.post('/agendamentos', (req, res) => {
  const { clienteId, profissionalId, data, hora, servico } = req.body;
  const novo = { id: agendamentos.length+1, clienteId, profissionalId, data, hora, servico, status: "pendente" };
  agendamentos.push(novo);
  console.log("Novo agendamento:", novo);
  res.status(201).json(novo);
});

router.get('/agendamentos', (req, res) => {
  res.json(agendamentos);
});

// Avaliações
router.post('/avaliacoes', (req, res) => {
  const { profissionalId, clienteId, nota, comentario } = req.body;
  const nova = { id: avaliacoes.length+1, profissionalId, clienteId, nota, comentario, data: new Date() };
  avaliacoes.push(nova);
  res.status(201).json(nova);
});

router.get('/avaliacoes/:profissionalId', (req, res) => {
  const lista = avaliacoes.filter(a => a.profissionalId == req.params.profissionalId);
  res.json(lista);
});

// ===== MEU PERFIL - CLIENTE LOGADO =====

// Buscar cliente por ID (para tela MeuPerfil)
router.get('/cliente/:id', (req, res) => {
  const cliente = clientes.find(c => c.id == req.params.id)
  if(!cliente) return res.status(404).json({erro: "Cliente não encontrado"})

  const {senha,...semSenha} = cliente
  res.json(semSenha)
})

// Atualizar meu perfil
router.put('/cliente/:id', async (req, res) => {
  const index = clientes.findIndex(c => c.id == req.params.id)
  if(index === -1) return res.status(404).json({erro: "Cliente não encontrado"})

  const { nome, cidade, email } = req.body

  // Se mandou email novo, verifica se já existe
  if(email && email!== clientes[index].email){
    if(clientes.find(c => c.email === email)){
      return res.status(400).json({erro: "Email já existe"})
    }
  }

  clientes[index] = {
   ...clientes[index],
    nome: nome || clientes[index].nome,
    cidade: cidade || clientes[index].cidade,
    email: email || clientes[index].email
  }

  const {senha,...semSenha} = clientes[index]
  console.log("Cliente atualizado:", semSenha)
  res.json({mensagem: "Perfil atualizado", cliente: semSenha})
})

module.exports = router;