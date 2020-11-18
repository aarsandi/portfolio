const express = require('express')
const router = express.Router()

const adminRouter = require('./admin')
const postRouter = require('./post')
const postCategoryRouter = require('./postCategory')
const projectRouter = require('./project')
const projectCategoryRouter = require('./projectCategory')
const skillRouter = require('./skill')
const userRouter = require('./user')

const SiteController = require('../controllers/SiteController')

router.use('/admin', adminRouter)
router.use('/post', postRouter)
router.use('/postcategory', postCategoryRouter)
router.use('/project', projectRouter)
router.use('/projectcategory', projectCategoryRouter)
router.use('/skill', skillRouter)
router.use('/user', userRouter)

router.get('/', SiteController.home)
router.get('/relatedpost', SiteController.relatedPost)
router.get('/relatedproject', SiteController.relatedProject)
router.post('/sendEmail', SiteController.sendEmail)

module.exports = router