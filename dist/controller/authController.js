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
const auth_1 = __importDefault(require("../services/auth"));
const apiResponse_1 = require("../utility/apiResponse");
class AuthController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, email } = req.body;
                const user = yield auth_1.default.register(username, email, password);
                new apiResponse_1.ApiResponse(res, 201, 'User register successfully', { user });
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const ipAddress = req.ip;
            const userAgent = req.headers['user-agent'] || "";
            const { user, token } = yield auth_1.default.login(email, password, ipAddress, userAgent);
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 3600000
            });
            res.json({ user });
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.cookies.token;
            if (token) {
                yield auth_1.default.logout(token);
            }
            res.clearCookie('token');
            res.sendStatus(204);
        });
    }
}
exports.default = new AuthController();
