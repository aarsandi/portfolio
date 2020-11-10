const { Post, Project, ProjectCategory, PostCategory, User } = require('../../models/index')

class SiteController {
    static async home(req, res, next) {
        try {
            const projects = await Project.findAll({
                where: {
                    featured: true
                },
                order: [['createdAt', 'DESC']],
                include: [
                    { model: ProjectCategory, as: 'ProjectCategories', through: { attributes: [] } },
                    { model: User, attributes: ['name', 'email', 'avatar'] }
                ]
            })
            const posts = await Post.findAll({
                where: {
                    featured: true
                },
                order: [['createdAt', 'DESC']],
                include: [
                    { model: PostCategory, as: 'PostCategories', through: { attributes: [] } },
                    { model: User, attributes: ['name', 'email', 'avatar'] }
                ]
            })
            res.status(200).json({
                projects: projects,
                posts: posts
            })
        } catch (err) {
            res.status(500).json({ message: "server error" })
        }
    }

    static async browseProject(req, res, next) {
        try {
            const projects = await Project.findAll({
                order: [['createdAt', 'DESC']],
                include: [
                    { model: ProjectCategory, as: 'ProjectCategories', through: { attributes: [] } },
                    { model: User, attributes: ['name', 'email', 'avatar'] }
                ]
            })
            res.status(200).json(projects)
        } catch (err) {
            next(err)
        }
    }

    static async readProject(req, res, next) {
        try {
            const project = await Project.findByPk(req.params.id, {
                include: [
                    { model: ProjectCategory, as: 'ProjectCategories', through: { attributes: [] } },
                    { model: User, attributes: ['name', 'email', 'avatar'] }
                ]
            })
            if (project === null) {
                next({
                    name: '404 Not Found',
                    error: 'Project not found'
                })
            } else {
                res.status(200).json(project)
            }
        } catch (err) {
            next(err)
        }
    }

    static async browsePost(req, res, next) {
        try {
            const posts = await Post.findAll({
                order: [['createdAt', 'DESC']],
                include: [
                    { model: PostCategory, as: 'PostCategories', through: { attributes: [] } },
                    { model: User, attributes: ['name', 'email', 'avatar'] }
                ]
            })
            res.status(200).json(posts)
        } catch (err) {
            next(err)
        }
    }

    static async readPost(req, res, next) {
        try {
            const post = await Post.findByPk(req.params.id, {
                include: [
                    { model: PostCategory, as: 'PostCategories', through: { attributes: [] } },
                    { model: User, attributes: ['name', 'email', 'avatar'] }
                ]
            })
            if(post === null) {
                next({
                    name: '404 Not Found',
                    error: 'Post not found'
                })
            } else {
                res.status(200).json(post)
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = SiteController