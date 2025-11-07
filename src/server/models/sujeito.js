const mongoose = require('mongoose');

const SujeitoSchema = new mongoose.Schema({
 nomeCompleto: { type: String, required: true },
 idExperimento: { type: String, required: true, unique: true },
 dataNascimento: { type: Date, required: true },
 classeTelecinetica: { type: String, required: true },
 estadoAtual: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Sujeito', SujeitoSchema);
