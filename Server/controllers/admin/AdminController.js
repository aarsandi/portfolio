const { User } = require('../../models/index')
const { comparePassword } = require('../../helpers/bcrypt')
const { signToken } = require('../../helpers/jwt')

class AdminController {
    // Login
    static login(req, res, next) {
        const inputPassword = req.body.password
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            const databasePassword = user ? user.password : ''
            if(!user) {
                next({
                    name: '400 Bad Request',
                    error: 'invalid username/password'
                })
            } else if (!comparePassword(inputPassword, databasePassword)) {
                next({
                    name: '400 Bad Request',
                    error: 'invalid username/password'
                })
            } else if (user.role != 'admin') {
                next({
                    name: '400 Bad Request',
                    error: 'your account is not admin'
                })
            } else {
                const payload = {
                    email: user.email
                }
                const token = signToken(payload)
                res.status(200).json({
                    token
                })
            }
        }).catch(err => {
            next(err)
        })
    }

    // Home
    static async home(req, res) {
        try {
            const users = await User.findAll()
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json({ message: "server error" })
        }
    }
}

module.exports = AdminController