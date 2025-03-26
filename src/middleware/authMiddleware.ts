import { Request, Response, NextFunction } from "express";

import auth from "../services/auth"

async function authenticate(req: Record<string, any>, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
        const user = await auth.validateToken(token)
        req.user = user;
        next()
    } catch (error) {
        res.clearCookie('token');
        return res.status(401).json({ message: 'Unauthorized' })
    }

}

module.exports = authenticate;