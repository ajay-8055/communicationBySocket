import { NextFunction } from "express"
import auth from "../services/auth"
import { ApiResponse } from "../utility/apiResponse"

import { Response, Request } from "express"

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password, email } = req.body;

            const user = await auth.register(username, email, password)

            new ApiResponse(res, 201, 'User register successfully', { user })

        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {

        const { email, password } = req.body;

        const ipAddress = req.ip
        const userAgent = req.headers['user-agent'] || ""

        const { user, token } = await auth.login(email, password, ipAddress, userAgent)

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 3600000
        })

        res.json({ user })
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.token;

        if (token) {
            await auth.logout(token)
        }

        res.clearCookie('token');
        res.sendStatus(204)
    }
}

export default new AuthController();