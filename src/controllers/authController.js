const store = require("../store");
const { semSenha, cadastroDTO, loginDTO } = require("../dtos/clientesDTO");

function cadastrar(req, res) {
  const dados = cadastroDTO(req.body);
  if (dados.erro) return res.status(400).json({ erro: dados.erro });

  const jaExiste = store.clientes.find((c) => c.email === dados.email);
  if (jaExiste) return res.status(400).json({ erro: "Email ja cadastrado" });

  const novo = { id: Date.now().toString(), ...dados };
  store.clientes.push(novo);
  return res.status(201).json(semSenha(novo));
}

function login(req, res) {
  const dados = loginDTO(req.body);
  if (dados.erro) return res.status(400).json({ erro: dados.erro });

  const cliente = store.clientes.find((c) => c.email === dados.email);
  if (!cliente || cliente.senha !== dados.senha) {
    return res.status(401).json({ erro: "Email ou senha invalidos" });
  }
  return res.json(semSenha(cliente));
}

function perfil(req, res) {
  const cliente = store.clientes.find((c) => c.id === req.params.id);
  if (!cliente) return res.status(404).json({ erro: "Cliente nao encontrado" });
  return res.json(semSenha(cliente));
}

module.exports = { cadastrar, login, perfil };
