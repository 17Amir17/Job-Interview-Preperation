const express = require('express');
const errorCodes = require('../data/errorCodes');
const sessions = require('../data/sessions');
const userQueries = require('../mongo/queries/userQueries');
const router = express.Router();

router.get('/get', (req, res, next) => {
  //Respond with leaderboard
  userQueries.getLeaderboard().then(
    (leader) => {
      res.json(leader);
    },
    (err) => {
      next(err);
    }
  );
});

router.post('', async (req, res, next) => {
  try {
    const name = req.body.name;
    const score = Number(req.body.score);
    const session = req.body.session;
    if (!name || !session || (!score && score != 0))
      throw errorCodes.requestInputInvalid;
    const userSession = sessions[session];
    if(!userSession) throw errorCodes.sessionDoesNotExists;
    if (score != userSession.score) throw errorCodes.niceTryScrub;
    const mongoRes = await userQueries.addOrUpdate(name, score);
    delete userSession;
    res.json({ message: mongoRes });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
