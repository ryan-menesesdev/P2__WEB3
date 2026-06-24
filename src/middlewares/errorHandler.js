function errorHandler(err, req, res, next) {
  console.error('Erro:', err.message);
  console.error(err.stack);

  if (err.message.includes('Email já cadastrado')) {
    return res.status(400).json({ error: err.message });
  }
  if (err.message.includes('Credenciais inválidas')) {
    return res.status(401).json({ error: err.message });
  }
  if (err.message.includes('Role inválida')) {
    return res.status(400).json({ error: err.message });
  }
  if (err.message.includes('não encontrado')) {
    return res.status(404).json({ error: err.message });
  }

  res.status(500).json({ error: 'Erro interno do servidor' });
}

module.exports = errorHandler;