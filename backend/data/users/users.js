const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: String,
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('User', userSchema);