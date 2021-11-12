const express = require('express');
const errorCodes = require('../constants/errorCodes');
const questionQueries = require('../mongo/queries/questionQueries');
const router = express.Router();

router.post('', async (req, res, next) => {
  try {
    let question = req.body;
    if (!question) throw errorCodes.requestInputInvalid;
    question = {
      title: question.title,
      correctAnswer: question.correctAnswer,
      answers: question.answers,
      difficulty: question.difficulty,
    };
    if (!validate(question)) throw errorCodes.requestInputInvalid;
    const mongoRes = await questionQueries.addQuestion(question);
    res.json({ message: mongoRes });
  } catch (error) {
    next(error);
  }
});

function validate(question) {
  for (const key in question) {
    if (!question[key]) return false;
  }
  return true;
}

module.exports = router;
