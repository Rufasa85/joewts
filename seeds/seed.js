const sequelize = require("../config/connection");
const {User} = require("../models")

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
    process.exit(0)
}

seed();