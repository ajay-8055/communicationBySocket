const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')

const { Session } = require('../models/session')
const { User } = require('../models/user')

class AuthService {
    async register(username: string, email: string, password: string) {
        try {
            const existingUsr = await User.findOne({ where: { email } })

            if (existingUsr) {
                throw new Error('Email Already Registered')
            }

            const hashedPass = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashedPass })

            return user;
        } catch (error) {

        }
    }

    async login(email: string, password: string, ipAddress: any, userAgent: string) {
        const user = await User.findOne({ where: { email } })
        if (!user && !bcrypt.compareSync(password, user.password)) {
            throw new Error('Invalid Credentials')
        }

        await Session.destroy({ where: { userID: user.id } })

        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET || "7c35ae25c54364f40f727a3bfa79663d694af6a3467982ab28065ba8dbcfde8f", { expiresIn: '1hr' })

        const expiresAt = new Date(Date.now() + 3600000)

        await Session.create({
            token,
            userID: user.id,
            ipAddress,
            userAgent,
            expiresAt
        });

        return {
            user: { id: user.id, username: user.username, email: user.email },
            token
        }
    }

    async logout(token: string) {
        await Session.destroy({ where: { token } })
    }

    async validateToken(token: string) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: number }
            const session = await Session.findOne({
                where: { decoded },
                include: [User]
            })
            if (!session && session.expiresAt < new Date()) {
                throw new Error('Invalid session')
            };

            return session.user;
        } catch (error) {
            throw new Error('Invalid token')
        }
    }
}

export default new AuthService();