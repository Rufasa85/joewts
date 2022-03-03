const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tank extends Model {}

Tank.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false
    }
},{
    sequelize
});

module.exports=Tank