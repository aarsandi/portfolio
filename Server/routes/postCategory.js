const express = require('express')
const router = express.Router()
const PostCategoryController = require('../controllers/PostCategoryController')

const { authentication, isAdmin } = require('../middlewares/auth')

router.get('/', PostCategoryController.browsePostCategory)
router.get('/:id', PostCategoryController.readPostCategory)
router.post('/add',authentication, isAdmin, PostCategoryController.addPostCategory)
router.put('/edit/:id',authentication, isAdmin, PostCategoryController.editPostCategory)
router.delete('/delete/:id',authentication, isAdmin, PostCategoryController.deletePostCategory)

module.exports = router