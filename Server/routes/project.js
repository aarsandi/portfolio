const express = require('express')
const router = express.Router()
const ProjectController = require('../controllers/ProjectController')

const { authentication, isAdmin } = require('../middlewares/auth')

router.get('/', ProjectController.browseProject)
router.get('/:id', ProjectController.readProject)
router.post('/add',authentication, isAdmin, ProjectController.addProject)
router.put('/edit/:id',authentication, isAdmin, ProjectController.editProject)
router.delete('/delete/:id',authentication, isAdmin, ProjectController.deleteProject)

module.exports = router