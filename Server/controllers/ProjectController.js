const { Project, ProjectCategory, User } = require('../models/index')

class ProjectController {
    static async browseProject(req, res, next) {
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

    static async readProject(req, res, next) {
        try {
            const project = await Project.findByPk(req.params.id, {
                include: [
                    { model: ProjectCategory, as: 'ProjectCategories', through: { attributes: [] } },
                    { model: User, attributes: ['name', 'email', 'avatar'] }
                ]
            })
            if(project === null) {
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

    static async addProject(req, res, next) {
        try {
            const newProject = {
                title: req.body.title,
                detail: req.body.detail,
                content: req.body.content,
                image: req.body.image,
                images: req.body.images,
                gitlink: req.body.gitlink,
                demolink: req.body.demolink,
                featured: req.body.featured,
                isdone: req.body.isdone,
                UserId: req.userLogin.id
            }
            const { ProjectCategories } = req.body
            const project = await Project.create(newProject)
            project.setProjectCategories(ProjectCategories)
            res.status(201).json(project)
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

    static async editProject(req, res, next) {
        try {
            const { id } = req.params
            const project = await Project.findByPk(id)
            const newProject = {
                title: req.body.title,
                detail: req.body.detail,
                content: req.body.content,
                image: req.body.image,
                images: req.body.images,
                gitlink: req.body.gitlink,
                demolink: req.body.demolink,
                featured: req.body.featured,
                isdone: req.body.isdone,
                UserId: req.userLogin.id
            }
            const { ProjectCategories } = req.body
            if(project == null) {
                next({
                    name: '404 Not Found',
                    error: 'Project Not Found'
                })
            } else {
                project.update(newProject)
                project.setProjectCategories(ProjectCategories)
                res.status(201).json(project)
            }
        } catch(err) {
            next(err)
        }
    }

    static async deleteProject(req, res, next) {
        try {
            const project = await Project.findByPk(req.params.id)
            const data = await Project.destroy({where: {id: req.params.id}})
            if(data == 0) {
                next({
                    name: '404 Not Found',
                    error: 'Project Not Found'
                })
            } else {
                res.status(200).json(project)
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProjectController