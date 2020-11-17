const { PostCategory } = require('../models/index')

class PostCategoryController {
    static async browsePostCategory(req, res, next) {
        try {
            const datas = await PostCategory.findAll()
            res.status(200).json(datas)
        } catch (err) {
            next(err)
        }
    }

    static async readPostCategory(req, res, next) {
        try {
            const data = await PostCategory.findByPk(req.params.id)
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

    static async addPostCategory(req, res, next) {
        try {
            const dataInput = {
                title: req.body.title
            }
            const data = await PostCategory.create(dataInput)
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

    static async editPostCategory(req, res, next) {
        try {
            const dataInput = {
                title: req.body.title
            }
            const { id } = req.params
            const data = await PostCategory.findByPk(id)
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

    static async deletePostCategory(req, res, next) {
        try {
            const category = await PostCategory.findByPk(req.params.id)
            const data = await PostCategory.destroy({where: {id: req.params.id}})
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

module.exports = PostCategoryController