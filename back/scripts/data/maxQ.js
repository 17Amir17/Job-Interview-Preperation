const questionQueries = require('../mongo/queries/questionQueries');

let maxQ;

async function getMaxQ() {
  if (!maxQ) {
    await setMaxQ();
  }
  return maxQ;
}

async function setMaxQ() {
  try {
    maxQ = (await questionQueries.getAllQuestions()).length;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getMaxQ, setMaxQ };
