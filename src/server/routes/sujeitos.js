const express = require('express');
const router = express.Router();
const Sujeito = require('../models/sujeito');
// POST - Criar novo
router.post('/', async (req, res) => {
 try {
  const { nomeCompleto, idExperimento, dataNascimento, classeTelecinetica, estadoAtual } = req.body;
   if (!nomeCompleto || !idExperimento || !dataNascimento || !classeTelecinetica || !estadoAtual) {
   return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  const novoSujeito = new Sujeito({
   nomeCompleto,
   idExperimento,
   dataNascimento,
   classeTelecinetica,
   estadoAtual
  });
  const salvo = await novoSujeito.save();
  res.status(201).json(salvo);
 } catch (error) {
  if (error.code === 11000) {
   return res.status(409).json({ error: 'ID de experimento já existe' });
  }
  res.status(500).json({ error: error.message });
 }
});


// GET - Listar todos
router.get('/', async (req, res) => {
 try {
  const sujeitos = await Sujeito.find().sort({ createdAt: -1 });
  res.json(sujeitos);
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
});

// DELETE - Remover por ID
router.delete('/:id', async (req, res) => {
 try {
  const removido = await Sujeito.findByIdAndDelete(req.params.id);
  if (!removido) {
   return res.status(404).json({ error: 'Sujeito não encontrado' });
  }
  res.json({ message: 'Anomalia registrada com sucesso' });
 } catch (error) {
  res.status(500).json({ error: error.message });
 }
});

module.exports = router;
