const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');

const User = db.define('User', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name:{
            type: DataTypes.STRING,
        },
        Email:{
            type:DataTypes.STRING,
        },
        Password:{
            type:DataTypes.STRING,
        },
        Contact_No:{
            type:DataTypes.STRING,
        },
        Address:{
            type:DataTypes.STRING,
        }
    },
    {
        timestamps: false
    }
)


module.exports = User;
