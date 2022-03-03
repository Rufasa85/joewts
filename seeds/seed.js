const sequelize = require("../config/connection");
const {User,Tank,Fish} = require("../models")

const seed = async ()=>{
    await sequelize.sync({force:true})
    const users = await User.bulkCreate([
        {
            email:"joe@joe.joe",
            password:"password"
        },
        {
            email:"brett@joe.joe",
            password:"wordpass"
        },
        {
            email:"frantz@joe.joe",
            password:"worldeworlde"
        },
       
    ],{individualHooks:true})
    console.log(users);
    const tanks = await Tank.bulkCreate([
        {name:`First Tank`,UserId:1},
        {name:`Second Tank`,UserId:2},
        {name:`Third Tank`,UserId:3},
    ])
    console.log(tanks);
    const fish =await Fish.bulkCreate([{
        name:"First Fish",
        color:"#123456",
        width:200,
        TankId:tanks[0].id,
        UserId:tanks[0].UserId,
    },{
        name:"Second Fish",
        TankId:tanks[0].id,
        UserId:tanks[0].UserId,
    },{
        name:"Third Fish",
        color:"#123ab6",
        width:300,
        TankId:tanks[1].id,
        UserId:tanks[1].UserId,
    }])
    process.exit(0)
}

seed();