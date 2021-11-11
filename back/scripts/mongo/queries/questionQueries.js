const Question = require('../models/questions');

async function insertMany(data) {
  return await Question.insertMany(data);
}

module.exports = { insertMany };
