const { Post, Project, ProjectCategory, PostCategory, User, Skill } = require('../models/index')

class SiteController {
    static async home(req, res, next) {
        try {
            const projects = await Project.findAll({
                where: {
                    featured: 1
                },
                order: [['updatedAt', 'DESC']],
                include: [
                    { model: ProjectCategory, as: 'ProjectCategories', through: { attributes: [] } },
                    { model: User, attributes: ['name', 'email', 'avatar'] }
                ]
            })
            const posts = await Post.findAll({
                where: {
                    featured: 1
                },
                order: [['updatedAt', 'DESC']],
                include: [
                    { model: PostCategory, as: 'PostCategories', through: { attributes: [] } },
                    { model: User, attributes: ['name', 'email', 'avatar'] }
                ]
            })
            const skills = await Skill.findAll({
                order: [['order', 'ASC']]
            })
            res.status(200).json({
                projects: projects,
                posts: posts,
                skills: skills
            })
        } catch (err) {
            next(err)
        }
    }

    static async relatedProject(req, res, next) {
        try {
            const projects = await Project.findAll({
                order: [['updatedAt', 'DESC']],
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

    static async relatedPost(req, res, next) {
        try {
            const projects = await Post.findAll({
                order: [['updatedAt', 'DESC']],
                include: [
                    { model: PostCategory, as: 'PostCategories', through: { attributes: [] } },
                    { model: User, attributes: ['name', 'email', 'avatar'] }
                ]
            })
            res.status(200).json(projects)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = SiteController