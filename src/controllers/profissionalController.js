const store = require("../store");

function listar(req, res) {
  return res.json(store.profissionais || []);
}

function buscarPorId(req, res) {
  const prof = (store.profissionais || []).find((p) => p.id === req.params.id);
  if (!prof) return res.status(404).json({ erro: "Profissional nao encontrado" });
  return res.json(prof);
}

function buscarPorServico(req, res) {
  const termo = (req.query.servico || "").toLowerCase();
  const lista = (store.profissionais || []).filter((p) =>
    (p.servico || "").toLowerCase().includes(termo)
  );
  return res.json(lista);
}

module.exports = { listar, buscarPorId, buscarPorServico };
