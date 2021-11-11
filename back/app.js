const express = require('express');
const cors = require('cors');
const mongo = require('./scripts/mongo/mongoClient');
//middleware and routers import
const errorHandler = require('./scripts/middleware/errorHandler');
const listRouter = require('./scripts/routers/listEnd');
const updateRouter = require('./scripts/routers/updateEnd');
const createRouter = require('./scripts/routers/createEnd');
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
// Routers
app.use('/info', listRouter);
app.use('/update', updateRouter);
app.use('/create', createRouter);
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
