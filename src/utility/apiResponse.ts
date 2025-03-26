import { Response } from "express";

export class ApiResponse {
    constructor(
        private res: Response,
        public statusCode: number,
        public message: string,
        public data: any,
    ) { }

    send() {
        this.res.status(this.statusCode).json({
            success: this.statusCode < 400,
            message: this.message,
            data: this.data
        });
    }
}