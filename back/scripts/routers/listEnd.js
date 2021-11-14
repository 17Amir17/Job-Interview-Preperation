const express = require('express');
const { v4: uuidv4 } = require('uuid');
const questionQueries = require('../mongo/queries/questionQueries');
const router = express.Router();
const sessions = require('../data/sessions');

router.get('/', (req, res) => {
  //Respond with all questions
  let newSession = req.headers.session === 'true';
  if (newSession) {
    //Create unique session
    newSession = uuidv4();
    sessions[newSession] = { score: 0, qIndex: 0 };
  }
  questionQueries.getAllQuestions().then(
    (questions) => {
      if (newSession) res.json({ session: newSession, questions });
      else res.json(questions);
    },
    (err) => {
      throw err;
    }
  );
});

module.exports = router;
