import { Sequelize } from "sequelize-typescript";
import { Session } from "./session";
import { User } from "./user";

const sequelized = new Sequelize({
    database: "social_db",
    username: "root",
    password: '12345',
    host: "localhost",
    dialect: 'mysql',
    port: 3306,
    models: [User, Session],

})

sequelized.authenticate().then(() => {
    console.log("Connection have been established succesfull")
}).catch((err: Error) => {
    console.log("Unable to Connect :", err)
})


module.exports = sequelized;