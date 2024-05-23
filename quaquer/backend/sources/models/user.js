const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  birthDate: {type: Number},
  firstName: {type: String, required:true},
  lastName: {type: String, required:true},
  username: { type: String, required: true, unique: true },
  identifier: { type: String, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
