"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./router/router"));
const socket_1 = require("./socket");
const express = require("express");
const sequelize = require("./models/db");
var http = require('http');
const app = express();
const PORT = process.env.PORT || 5000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.sync();
            console.log("Database is connected");
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
            console.log("Connection test");
            app.get('/test', (req, res) => {
                res.send("You are Connected to the World");
            });
            function middleware1(req, res, next) {
                console.log("Testing 25 lin no.");
                next();
            }
            app.use('/api', middleware1, router_1.default);
            var server = http.createServer(app);
            (0, socket_1.setupSocket)(server);
            app.listen(PORT, () => {
                console.log(`Server is running on http://localhost:${PORT}`);
            });
        }
        catch (error) {
            console.log("Error : ", error);
        }
    });
}
startServer();
