const Question = require('../models/questions');

async function insertMany(data) {
  return await Question.insertMany(data);
}

async function getAllQuestions() {
  return await Question.find({});
}

module.exports = { insertMany };
