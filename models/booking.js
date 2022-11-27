const { Sequelize, DataTypes } = require('sequelize');

const db = require('../config/database');

const Booking = db.define('Booking', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        User_Id:{
            type: DataTypes.STRING,
        },
        Booking_Date:{
            type:DataTypes.STRING,
        },
        Vehicle_Number:{
            type:DataTypes.STRING,
        },
        Status:{
            type:DataTypes.STRING,
        },
        Place_Id:{
            type:DataTypes.INTEGER,
        },
        Service_Id:{
            type:DataTypes.INTEGER,
        }
    },
    {
        timestamps: false
    }
)


module.exports = Booking;
