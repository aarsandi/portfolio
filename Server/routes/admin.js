const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin/AdminController')
const PostController = require('../controllers/admin/PostController')
const ProjectController = require('../controllers/admin/ProjectController')
const UserController = require('../controllers/admin/UserController')
const ProjectCategoryController = require('../controllers/admin/ProjectCategoryController')
const PostCategoryController = require('../controllers/admin/PostCategoryController')
const SkillController = require('../controllers/admin/SkillController')

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

// Project Category
router.get('/projectcategories',authentication, isAdmin, ProjectCategoryController.browseProjectCategory)
router.get('/projectcategory/:id',authentication, isAdmin, ProjectCategoryController.readProjectCategory)
router.post('/projectcategory/add',authentication, isAdmin, ProjectCategoryController.addProjectCategory)
router.put('/projectcategory/edit/:id',authentication, isAdmin, ProjectCategoryController.editProjectCategory)
router.delete('/projectcategory/delete/:id',authentication, isAdmin, ProjectCategoryController.deleteProjectCategory)

// Post Category
router.get('/postcategories',authentication, isAdmin, PostCategoryController.browsePostCategory)
router.get('/postcategory/:id',authentication, isAdmin, PostCategoryController.readPostCategory)
router.post('/postcategory/add',authentication, isAdmin, PostCategoryController.addPostCategory)
router.put('/postcategory/edit/:id',authentication, isAdmin, PostCategoryController.editPostCategory)
router.delete('/postcategory/delete/:id',authentication, isAdmin, PostCategoryController.deletePostCategory)

// Skill
router.get('/skills',authentication, isAdmin, SkillController.browseSkill)
router.get('/skill/:id',authentication, isAdmin, SkillController.readSkill)
router.put('/skill/edit/:id',authentication, isAdmin, SkillController.editSkill)

// User
router.get('/users',authentication, isAdmin, UserController.browse)
router.get('/user/:id',authentication, isAdmin, UserController.read)
router.post('/user/add',authentication, isAdmin, UserController.add)
router.put('/user/edit/:id',authentication, isAdmin, UserController.edit)
router.delete('/user/delete/:id',authentication, isAdmin, UserController.delete)

module.exports = router