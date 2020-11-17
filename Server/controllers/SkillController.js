const { Skill } = require('../models/index')

class SkillController {
    static async browseSkill(req, res, next) {
        try {
            const skills = await Skill.findAll({
                order: [['order', 'ASC']]
            })
            res.status(200).json(skills)
        } catch (err) {
            next(err)
        }
    }

    static async editSkill(req, res, next) {
        try {
            const newSkill = {
                title: req.body.title,
                icon: req.body.icon,
                order: req.body.order,
                detail: req.body.detail
            }
            const { id } = req.params
            const skill = await Skill.findByPk(id)
            if(skill == null) {
                next({
                    name: '404 Not Found',
                    error: 'Skill Not Found'
                })
            } else {
                skill.update(newSkill)
                res.status(201).json(skill)
            }
        } catch(err) {
            next(err)
        }
    }
}

module.exports = SkillController