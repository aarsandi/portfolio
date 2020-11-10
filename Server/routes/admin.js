const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin/AdminController')
const PostController = require('../controllers/admin/PostController')
const ProjectController = require('../controllers/admin/ProjectController')
const UserController = require('../controllers/admin/UserController')
const { authentication, isAdmin } = require('../middlewares/auth')

router.get('/',authentication, isAdmin, AdminController.home)
router.post('/login', AdminController.login)

// Project
router.get('/projects',authentication, isAdmin, ProjectController.browseProject)
router.get('/project/:id',authentication, isAdmin, ProjectController.readProject)
router.post('/project/add',authentication, isAdmin, ProjectController.addProject)
router.put('/project/edit/:id',authentication, isAdmin, ProjectController.editProject)
router.delete('/project/delete/:id',authentication, isAdmin, ProjectController.deleteProject)

// Post
router.get('/posts', authentication, isAdmin, PostController.browsePost)
router.get('/post/:id', authentication, isAdmin, PostController.readPost)
router.post('/post/add', authentication, isAdmin, PostController.addPost)
router.put('/post/edit/:id', authentication, isAdmin, PostController.editPost)
router.delete('/post/delete/:id', authentication, isAdmin, PostController.deletePost)

// User
router.get('/users',authentication, isAdmin, UserController.browse)
router.get('/user/:id',authentication, isAdmin, UserController.read)
router.post('/user/add',authentication, isAdmin, UserController.add)
router.put('/user/edit/:id',authentication, isAdmin, UserController.edit)
router.delete('/user/delete/:id',authentication, isAdmin, UserController.delete)

module.exports = router