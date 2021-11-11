const errorCodes = require('../../constants/errorCodes');
const Question = require('../models/questions');

async function insertMany(data) {
  return await Question.insertMany(data);
}

async function getAllQuestions() {
  return await Question.find({});
}

async function updateQuestion(question) {
  try {
    return await Question.findOneAndUpdate(
      { _id: question._id },
      { ...question }
    );
  } catch (error) {
    throw errorCodes.couldNotFindEntry;
  }
}

module.exports = { insertMany, getAllQuestions, updateQuestion };
