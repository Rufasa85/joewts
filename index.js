const express = require("express");

const cors = require("cors");

// Sets up the Express App
// =============================================================
const app = express();
const allRoutes = require('./controllers');
const sequelize = require("./config/connection");

app.use(cors());
const PORT = process.env.PORT || 3001;
// Requiring our models for syncing
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { User } = require("./models");

app.use(allRoutes);

sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
