"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const session_1 = require("./session");
const user_1 = require("./user");
const sequelized = new sequelize_typescript_1.Sequelize({
    database: "social_db",
    username: "root",
    password: '12345',
    host: "localhost",
    dialect: 'mysql',
    port: 3306,
    models: [user_1.User, session_1.Session],
});
sequelized.authenticate().then(() => {
    console.log("Connection have been established succesfull");
}).catch((err) => {
    console.log("Unable to Connect :", err);
});
module.exports = sequelized;
