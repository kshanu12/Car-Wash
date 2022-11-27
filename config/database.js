const Sequelize = require("sequelize");
module.exports = new Sequelize("car_wash", "root", "", {
    host: "localhost",
    dialect: "mysql",
});
