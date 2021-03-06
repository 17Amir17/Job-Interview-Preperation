const express = require('express');
const errorCodes = require('../constants/errorCodes');
const questionQueries = require('../mongo/queries/questionQueries');
const router = express.Router();

router.delete('', async (req, res, next) => {
  try {
    const id = req.body.id;
    if (!id) throw errorCodes.requestInputInvalid;
    const mongoRes = await questionQueries.deleteQuestionById(id);
    res.json({ message: mongoRes });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
