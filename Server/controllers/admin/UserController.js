const {  User } = require('../../models/index')

class UserController {
    static async browse(req, res, next) {
        try {
            const users = await User.findAll({attributes: { exclude: ['password'] }})
            res.status(200).json(users)
        } catch (err) {
            next(err)
        }
    }

    static async read(req, res, next) {
        try {
            const user = await User.findByPk(req.params.id, {attributes: { exclude: ['password'] }})
            if(user === null) {
                next({
                    name: '404 Not Found',
                    error: 'User not found'
                })
            } else {
                res.status(200).json(user)
            }
        } catch (err) {
            next(err)
        }
    }

    static async add(req, res, next) {
        try {
            const { ...data } = req.body
            const user = await User.create(data)
            res.status(201).json({
                name: user.name,
                email: user.email
            })
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                next({
                    name: '400 Bad Request',
                    error: err.errors[0].message
                })
            } else if (err.name === "SequelizeUniqueConstraintError") {
                next({
                    name: '400 Bad Request',
                    error: err.errors[0].message
                })
            } else {
                next(err)
            }
        }
    }

    static async edit(req, res, next) {
        try {
            const { id } = req.params
            const user = await User.findByPk(id)
            const { ...data } = req.body
            if(user == null) {
                next({
                    name: '404 Not Found',
                    error: 'User Not Found'
                })
            } else {
                user.update(data)
                res.status(201).json({ 
                    name: user.name,
                    email: user.email
                })
            }
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                next({
                    name: '400 Bad Request',
                    error: err.errors[0].message
                })
            } else {
                next(err)
            }
        }
    }

    static async delete(req, res, next) {
        try {
            const user = await User.findByPk(req.params.id)
            const data = await User.destroy({where: {id: req.params.id}})
            if(data == 0) {
                next({
                    name: '404 Not Found',
                    error: 'User Not Found'
                })
            } else {
                res.status(200).json({ 
                    name: user.name,
                    email: user.email
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController