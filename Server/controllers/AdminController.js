const { User, Post, PostCategory, Project, ProjectCategory } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

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
    static async home(req, res, next) {
        try {
            const user = await User.findByPk(req.userLogin.id, {attributes: { exclude: ['password'] }})
            const posts = await Post.findAll({
                order: [['updatedAt', 'DESC']],
                include: [
                    { model: PostCategory, as: 'PostCategories', through: { attributes: [] } },
                    { model: User, attributes: ['name', 'email', 'avatar'] }
                ]
            })
            const projects = await Project.findAll({
                order: [['updatedAt', 'DESC']],
                include: [
                    { model: ProjectCategory, as: 'ProjectCategories', through: { attributes: [] } },
                    { model: User, attributes: ['name', 'email', 'avatar'] }
                ]
            })
            res.status(200).json({ user: user, posts: posts, projects: projects })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = AdminController