const mongoose = require('mongoose');

const questionsShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('user', questionsShema);
