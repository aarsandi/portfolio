const express = require('express')
const router = express.Router()
const ProjectCategoryController = require('../controllers/ProjectCategoryController')

const { authentication, isAdmin } = require('../middlewares/auth')

router.get('/', ProjectCategoryController.browseProjectCategory)
router.get('/:id', ProjectCategoryController.readProjectCategory)
router.post('/add',authentication, isAdmin, ProjectCategoryController.addProjectCategory)
router.put('/edit/:id',authentication, isAdmin, ProjectCategoryController.editProjectCategory)
router.delete('/delete/:id',authentication, isAdmin, ProjectCategoryController.deleteProjectCategory)

module.exports = router