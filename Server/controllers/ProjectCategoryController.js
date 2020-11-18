const { ProjectCategory } = require('../models/index')

class ProjectCategoryController {
    static async browseProjectCategory(req, res, next) {
        try {
            const datas = await ProjectCategory.findAll({
                order: [['updatedAt', 'DESC']],
            })
            res.status(200).json(datas)
        } catch (err) {
            next(err)
        }
    }

    static async readProjectCategory(req, res, next) {
        try {
            const data = await ProjectCategory.findByPk(req.params.id)
            if(data === null) {
                next({
                    name: '404 Not Found',
                    error: 'Category not found'
                })
            } else {
                res.status(200).json(data)
            }
        } catch (err) {
            next(err)
        }
    }

    static async addProjectCategory(req, res, next) {
        try {
            const dataInput = {
                title: req.body.title
            }
            const data = await ProjectCategory.create(dataInput)
            res.status(201).json(data)
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

    static async editProjectCategory(req, res, next) {
        try {
            const dataInput = {
                title: req.body.title
            }
            const { id } = req.params
            const data = await ProjectCategory.findByPk(id)
            if(data == null) {
                next({
                    name: '404 Not Found',
                    error: 'Category Not Found'
                })
            } else {
                data.update(dataInput)
                res.status(201).json(data)
            }
        } catch(err) {
            next(err)
        }
    }

    static async deleteProjectCategory(req, res, next) {
        try {
            const category = await ProjectCategory.findByPk(req.params.id)
            const data = await ProjectCategory.destroy({where: {id: req.params.id}})
            if(data == 0) {
                next({
                    name: '404 Not Found',
                    error: 'Category Not Found'
                })
            } else {
                res.status(200).json(category)
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProjectCategoryController