const { Post, Project, ProjectCategory, PostCategory, User, Skill } = require('../models/index')
const nodemailer = require('nodemailer');

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

    static sendEmail(req, res, next) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `Email from Web Portfolio`,
            text: `Hi!!, my name is ${req.body.name},
This is my email ${req.body.email},
__________________________________
${req.body.content}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
            next(error)
        } else {
            res.status(200).json({
                status: 'Email sent: ' + info.response
            })
        }
        });
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