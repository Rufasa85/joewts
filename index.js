const express = require("express");
const jwt = require("jsonwebtoken")
// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;
// Requiring our models for syncing
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static directory

app.get("/",(req,res)=>{
    res.send("hello")
})

app.post("/login",(req,res)=>{
    if(req.body.password==="hello"){
        const token = jwt.sign({
            username:"Timmy",
            userId:1
        },"i like turtles",{
            expiresIn:"2h"
        })
        res.json({token:token})
    }else {
        return res.status(403).send("invalid credentials")
    }
})

app.get("/secretclub",(req,res)=>{
     console.log(req.headers);
     const token =req.headers?.authorization?.split(" ").pop();
     console.log(token)
    //  res.json(req.headers);
     jwt.verify(token,"i like turtles",(err,data)=>{
         if(err){
             console.log(err)
             res.status(403).json({msg:"invalid credentials",err});
         } else{
             res.send(`welcome to the club, ${data.username}!`)
         }
     })
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
