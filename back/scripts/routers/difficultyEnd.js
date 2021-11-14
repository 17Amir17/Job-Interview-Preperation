const express = require('express');
const errorCodes = require('../data/errorCodes');
const questionQueries = require('../mongo/queries/questionQueries');
const router = express.Router();

router.get('/:difficulty', async (req, res, next) => {
  try {
    const difficulty = req.params.difficulty;
    if (!difficulty) throw errorCodes.requestInputInvalid;
    const questions = await questionQueries.getGreaterOrEqual(difficulty);
    res.json(questions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
