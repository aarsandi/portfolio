const express = require('express')
const router = express.Router()
const SkillController = require('../controllers/SkillController')

const { authentication, isAdmin } = require('../middlewares/auth')

router.get('/', SkillController.browseSkill)
router.put('/edit/:id',authentication, isAdmin, SkillController.editSkill)

module.exports = router