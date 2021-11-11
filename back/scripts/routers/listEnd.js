const express = require('express');
const questionQueries = require('../mongo/queries/questionQueries');
const router = express.Router();

router.get('/', (req, res) => {
  //Respond with all questions
  questionQueries.getAllQuestions().then(
    (questions) => res.json(questions),
    (err) => {
      throw err;
    }
  );
});

module.exports = router;
