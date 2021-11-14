const errorCodes = require('../../data/errorCodes');
const Question = require('../models/questions');

async function insertMany(data) {
  return await Question.insertMany(data);
}

async function getAllQuestions() {
  return await Question.find({}).sort({ difficulty: 1 });
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

async function getGreaterOrEqual(difficulty) {
  // Returns all questions greater or equal to difficulty in ascending way
  try {
    return await Question.find({
      difficulty: { $gte: difficulty },
    }).sort({ difficulty: 1 });
  } catch (error) {
    throw errorCodes.unknownMongoError;
  }
}

async function checkQuestion(_id, answer) {
  try {
    const question = await Question.findOne({ _id });
    return {
      correct: question.correctAnswer === answer,
      diff: question.difficulty,
    };
  } catch (error) {
    throw errorCodes.badAuth;
  }
}

module.exports = {
  insertMany,
  getAllQuestions,
  updateQuestion,
  addQuestion,
  deleteQuestionById,
  getGreaterOrEqual,
  checkQuestion,
};
