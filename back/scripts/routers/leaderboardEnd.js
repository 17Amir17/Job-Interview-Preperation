const express = require('express');
const errorCodes = require('../constants/errorCodes');
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
    if (!name || (!score && score != 0)) throw errorCodes.requestInputInvalid;
    const mongoRes = await userQueries.addOrUpdate(name, score);
    res.json({ message: mongoRes });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
