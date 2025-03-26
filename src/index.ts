import router from "./router/router";
import { setupSocket } from "./socket";
const express = require("express");
const sequelize = require("./models/db")
import { NextFunction, Request, Response } from "express";
var http = require('http');

const app = express();
const PORT = process.env.PORT || 5000

async function startServer() {
    try {
        await sequelize.sync()
        console.log("Database is connected")

        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        console.log("Connection test")

        app.get('/test', (req: Request, res: Response) => {
            res.send("You are Connected to the World")
        })

        function middleware1(req: Request, res: Response, next: NextFunction) {
            console.log("Testing 25 lin no.")
            next()
        }

        app.use('/api', middleware1, router)

        var server = http.createServer(app);
        setupSocket(server)

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })

    } catch (error) {
        console.log("Error : ", error)
    }
}

startServer();