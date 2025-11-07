const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middlewares
app.use(express.json());
// Conectar MongoDB
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL)
 .then(() => console.log('✅ MongoDB conectado'))
 .catch(err => console.log('❌ Erro MongoDB:', err.message));

// Rotas
app.use('/api/sujeitos', require('./routes/sujeitos'));
// Health check simples
app.get('/health', (req, res) => {
 res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'conectado' : 'desconectado' });
});
// Iniciar servidor
app.listen(PORT, () => {
 console.log(`🚀 Servidor rodando na porta ${PORT}`);
});