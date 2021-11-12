const express = require('express');
const cors = require('cors');
const path = require('path');
const mongo = require('./scripts/mongo/mongoClient');
//middleware and routers import
const errorHandler = require('./scripts/middleware/errorHandler');
const listRouter = require('./scripts/routers/listEnd');
const updateRouter = require('./scripts/routers/updateEnd');
const createRouter = require('./scripts/routers/createEnd');
const deleteRouter = require('./scripts/routers/removeEnd');
const difficultyRouter = require('./scripts/routers/difficultyEnd');
const leaderboardRouter = require('./scripts/routers/leaderboardEnd');
//DB setup
const mongoInit = mongo.init();
//Port setup
const port = process.env.PORT || 3000;
//Server Setup
const app = express();
app.use(express.json());
app.use(cors());
// Middleware
// .....
//Main router and static file
app.use(express.static(path.join(__dirname, '../build/')));
app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
// Routers
app.use('/info', listRouter);
app.use('/update', updateRouter);
app.use('/create', createRouter);
app.use('/remove', deleteRouter);
app.use('/read/by/difficulty', difficultyRouter);
app.use('/leaderboard', leaderboardRouter);
// Error Handler
// .....
app.use(errorHandler);
(async () => {
  // Wait for mongo
  await mongoInit;
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
})();
