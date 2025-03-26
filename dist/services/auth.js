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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Session } = require('../models/session');
const { User } = require('../models/user');
class AuthService {
    register(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUsr = yield User.findOne({ where: { email } });
                if (existingUsr) {
                    throw new Error('Email Already Registered');
                }
                const hashedPass = yield bcrypt.hash(password, 10);
                const user = yield User.create({ username, email, password: hashedPass });
                return user;
            }
            catch (error) {
            }
        });
    }
    login(email, password, ipAddress, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findOne({ where: { email } });
            if (!user && !bcrypt.compareSync(password, user.password)) {
                throw new Error('Invalid Credentials');
            }
            yield Session.destroy({ where: { userID: user.id } });
            const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET || "7c35ae25c54364f40f727a3bfa79663d694af6a3467982ab28065ba8dbcfde8f", { expiresIn: '1hr' });
            const expiresAt = new Date(Date.now() + 3600000);
            yield Session.create({
                token,
                userID: user.id,
                ipAddress,
                userAgent,
                expiresAt
            });
            return {
                user: { id: user.id, username: user.username, email: user.email },
                token
            };
        });
    }
    logout(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Session.destroy({ where: { token } });
        });
    }
    validateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const session = yield Session.findOne({
                    where: { decoded },
                    include: [User]
                });
                if (!session && session.expiresAt < new Date()) {
                    throw new Error('Invalid session');
                }
                ;
                return session.user;
            }
            catch (error) {
                throw new Error('Invalid token');
            }
        });
    }
}
exports.default = new AuthService();
