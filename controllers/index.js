const express = require('express');
const router = express.Router();
const userRoutes = require("./user")
const fishRoutes = require("./fish")
const tankRoutes = require("./tank")

router.use("/api/users",userRoutes);
router.use("/api/fish",fishRoutes);
router.use("/api/tanks",tankRoutes);


router.get("/", (req, res) => {
    res.send("hello");
  });
  

module.exports = router;