const User = require('../models/users');

async function addOrUpdate(name, score) {
  //If name not in db create, only update if score is larger than cur score
  return await User.updateOne({ name }, { $max: { score } }, { upsert: true });
}

async function getLeaderboard() {
  return await User.find({}).sort({ score: -1 });
}

module.exports = { addOrUpdate, getLeaderboard };
