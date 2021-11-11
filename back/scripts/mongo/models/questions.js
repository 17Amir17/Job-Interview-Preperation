const mongoose = require('mongoose');

const questionsShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  answers: {
    type: String,
    required: true,
  },
  dificulty: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model('question', questionsShema);
