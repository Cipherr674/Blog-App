const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Email: {
    type: String,
    required: true,
    trim: true,
  },
  Password: {
    type: String,
    required: true,
  }, 
  Number: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('user', userSchema); //
