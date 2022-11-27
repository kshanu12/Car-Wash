const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');

const Service = db.define('Service', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Service_Name:{
            type: DataTypes.STRING,
        },
        Cose:{
            type:DataTypes.INTEGER,
        }
    },
    {
        timestamps: false
    }
)

module.exports = Service;