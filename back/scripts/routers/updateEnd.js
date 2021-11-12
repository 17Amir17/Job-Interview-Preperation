const express = require('express');
const errorCodes = require('../constants/errorCodes');
const questionQueries = require('../mongo/queries/questionQueries');
const router = express.Router();

router.put('', (req, res, next) => {
  const newQuestion = req.body;
  if (!newQuestion || !newQuestion._id) throw errorCodes.requestInputInvalid;
  questionQueries.updateQuestion(newQuestion).then(
    (mongoRes) => {
      res.json({ message: mongoRes });
    },
    (err) => {
      next(err);
    }
  );
});

module.exports = router;
