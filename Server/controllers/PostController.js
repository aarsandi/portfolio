const { Post, PostCategory, User } = require('../models/index')

class PostController {
    static async browsePost(req, res, next) {
        try {
            const posts = await Post.findAll({
                order: [['updatedAt', 'DESC']],
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

    static async addPost(req, res, next) {
        try {
            const newPost = {
                title: req.body.title,
                detail: req.body.detail,
                content: req.body.content,
                image: req.body.image,
                images: req.body.images,
                featured: req.body.featured,
                UserId: req.userLogin.id
            }
            const { PostCategories } = req.body
            const post = await Post.create(newPost)
            post.setPostCategories(PostCategories)
            res.status(201).json(post)
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

    static async editPost(req, res, next) {
        try {
            const newPost = {
                title: req.body.title,
                detail: req.body.detail,
                content: req.body.content,
                image: req.body.image,
                images: req.body.images,
                featured: req.body.featured,
                UserId: req.userLogin.id
            }
            const { id } = req.params
            const post = await Post.findByPk(id)
            const { PostCategories } = req.body
            if(post == null) {
                next({
                    name: '404 Not Found',
                    error: 'Post Not Found'
                })
            } else {
                post.update(newPost)
                post.setPostCategories(PostCategories)
                res.status(201).json(post)
            }
        } catch(err) {
            next(err)
        }
    }

    static async deletePost(req, res, next) {
        try {
            const post = await Post.findByPk(req.params.id)
            const data = await Post.destroy({where: {id: req.params.id}})
            if(data == 0) {
                next({
                    name: '404 Not Found',
                    error: 'Post Not Found'
                })
            } else {
                res.status(200).json(post)
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = PostController