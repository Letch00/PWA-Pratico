const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: String,
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  status: { type: String, default: 'pending' } // pending ou active; o registo público cria contas pendentes que o administrador aprova |
});

module.exports = mongoose.model('User', userSchema);