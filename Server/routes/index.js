const express = require('express')
const router = express.Router()
const adminRouter = require('./admin')
const SiteController = require('../controllers/site/SiteController')

router.use('/admin', adminRouter)

router.get('/', SiteController.home)
router.get('/projects', SiteController.browseProject)
router.get('/project/:id', SiteController.readProject)
router.get('/posts', SiteController.browsePost)
router.get('/post/:id', SiteController.readPost)

module.exports = router