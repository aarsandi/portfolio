const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')

const { authentication, isAdmin } = require('../middlewares/auth')

// Post
router.get('/', PostController.browsePost)
router.get('/:id', PostController.readPost)
router.post('/add', authentication, isAdmin, PostController.addPost)
router.put('/edit/:id', authentication, isAdmin, PostController.editPost)
router.delete('/delete/:id', authentication, isAdmin, PostController.deletePost)

module.exports = router