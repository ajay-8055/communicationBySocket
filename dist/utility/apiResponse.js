"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(res, statusCode, message, data) {
        this.res = res;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
    send() {
        this.res.status(this.statusCode).json({
            success: this.statusCode < 400,
            message: this.message,
            data: this.data
        });
    }
}
exports.ApiResponse = ApiResponse;
