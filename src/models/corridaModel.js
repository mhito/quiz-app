const mongoose = require('mongoose');

const corridaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
});

const Corrida = mongoose.model('Corrida', corridaSchema);

module.exports = Corrida;

