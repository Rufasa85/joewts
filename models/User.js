const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class User extends Model {}

User.init({
    // add properites here, ex:
    email: {
         type: DataTypes.STRING,
         unique:true,
         allowNull:false,
         validate:{
             isEmail:true
         }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[8]
        }
    }

},{
    sequelize,
    hooks:{
        beforeCreate: newUser=>{
            newUser.password = bcrypt.hashSync(newUser.password,4)
        }
    }
});

module.exports=User