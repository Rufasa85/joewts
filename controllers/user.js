const express = require('express');
const router = express.Router();
const {User} = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/login", (req, res) => {
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
            res.json({ 
                token: token, 
                user: dbUser
            });
          } else {
            return res.status(403).send("invalid credentials");
          }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({msg:"an error occured",err})
    })
});


router.get("/gettokendata", (req, res) => {
  console.log(req.headers);
  const token = req.headers?.authorization?.split(" ").pop();
  console.log(token);
  //  res.json(req.headers);
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      console.log(err);
      res.status(403).json({ msg: "invalid credentials", err });
    } else {
      User.findByPk(data.id).then(userData=>{
          res.json(userData);
      })
    }
  });
});


module.exports = router;