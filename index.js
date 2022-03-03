const express = require("express");
const jwt = require("jsonwebtoken")
const cors = require("cors")
// Sets up the Express App
// =============================================================
const app = express();
app.use(cors())
const PORT = process.env.PORT || 3001;
// Requiring our models for syncing
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static directory
const fishes= [
    {
        id:1,
        name:"Joe",
        color:"#456abc",
        width:100
    },
    {
        id:2,
        name:"Brett",
        color:"#cabcab",
        width:200
    },
    {
        id:3,
        name:"Frantz",
        color:"#aef832",
        width:150
    }
]

app.get("/",(req,res)=>{
    res.send("hello")
})

app.get("/api/fish",(req,res)=>{
    res.json(fishes)
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
