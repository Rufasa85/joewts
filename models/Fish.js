const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Fish extends Model {}

Fish.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false
    },
    color: {
         type: DataTypes.STRING,
         allowNull:false,
         defaultValue:"#bada55"
    },
    width: {
         type: DataTypes.INTEGER,
         allowNull:false,
         defaultValue:100
    }
},{
    sequelize
});

module.exports=Fish