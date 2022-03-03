const express = require('express');
const router = express.Router();
const {User,Tank,Fish} = require('../models');

router.get("/",(req,res)=>{
    Tank.findAll({
        include:[Fish]
    }).then(dbTanks=>{
        res.json(dbTanks)
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;