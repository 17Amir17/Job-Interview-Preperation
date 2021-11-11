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

async function addQuestion(question) {
  try {
    const quest = new Question({ ...question });
    return await quest.save();
  } catch (error) {
    throw errorCodes.badEntryFormat;
  }
}

async function deleteQuestionById(_id) {
  try {
    return await Question.deleteOne({ _id });
  } catch (error) {
    throw errorCodes.couldNotFindEntry;
  }
}

module.exports = {
  insertMany,
  getAllQuestions,
  updateQuestion,
  addQuestion,
  deleteQuestionById,
};
