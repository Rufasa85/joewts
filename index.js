const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
// Sets up the Express App
// =============================================================
const app = express();
// const allRoutes = require('./controllers');
const sequelize = require("./config/connection");

app.use(cors());
const PORT = process.env.PORT || 3001;
// Requiring our models for syncing
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { User } = require("./models");

const fishes = [
  {
    id: 1,
    name: "Joe",
    color: "#456abc",
    width: 100
  },
  {
    id: 2,
    name: "Brett",
    color: "#cabcab",
    width: 200
  },
  {
    id: 3,
    name: "Frantz",
    color: "#aef832",
    width: 150
  }
];

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api/fish", (req, res) => {
  res.json(fishes);
});

app.post("/login", (req, res) => {
    User.findOne({where:{email:req.body.email}}).then(dbUser=>{
        if(!dbUser){
            return res.status(403).send("invalid credentials")
        } 
        if (bcrypt.compareSync(req.body.password,dbUser.password)) {
            const token = jwt.sign(
              {
                email: dbUser.email,
                id: dbUser.id
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "2h"
              }
            );
            res.json({ token: token });
          } else {
            return res.status(403).send("invalid credentials");
          }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({msg:"an error occured",err})
    })
});

app.get("/secretclub", (req, res) => {
  console.log(req.headers);
  const token = req.headers?.authorization?.split(" ").pop();
  console.log(token);
  //  res.json(req.headers);
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      console.log(err);
      res.status(403).json({ msg: "invalid credentials", err });
    } else {
      res.send(`welcome to the club, ${data.email}!`);
    }
  });
});

sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
