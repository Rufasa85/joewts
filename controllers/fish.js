const express = require('express');
const router = express.Router();
const {Fish,User,Tank} = require("../models")
  
router.get("/", (req, res) => {
    Fish.findAll().then(fish=>{
      res.json(fish)
    }).catch(err=>{
      console.log(err);
      res.status(500).json({err});
    })
  });

module.exports = router;