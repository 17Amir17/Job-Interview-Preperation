const express = require('express');
const questionQueries = require('../mongo/queries/questionQueries');
const router = express.Router();
const sessions = require('../data/sessions');
const errorCodes = require('../data/errorCodes');
const { getMaxQ } = require('../data/maxQ');

router.post('/', async (req, res, next) => {
  try {
    //Get and validate body
    const session = req.body.session;
    const id = req.body.id;
    const answer = String(req.body.answer);
    if (!id || !session || (!answer && answer != 0))
      throw errorCodes.requestInputInvalid;
    //Check answer
    const { correct, diff } = await questionQueries.checkQuestion(id, answer);
    const userSession = sessions[session];
    if (!userSession) throw errorCodes.sessionDoesNotExists;
    if (correct) {
      if ((await getMaxQ()) > userSession.qIndex) {
        userSession.score += diff;
      } else throw errorCodes.badAuth;
    }
    userSession.qIndex += 1;
    res.json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
