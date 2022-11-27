const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');

const Place = db.define('Place', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        City:{
            type: DataTypes.STRING,
        },
        States:{
            type:DataTypes.STRING,
        }
    },
    {
        timestamps: false
    }
)


module.exports = Place;
