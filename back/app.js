const express = require('express');
const cors = require('cors');
const mongo = require('./scripts/mongo/mongoClient');

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
// .....
// Error Handler
// .....
(async () => {
  // Wait for mongo
  await mongoInit;
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
})();
