const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/AdminController')

const { authentication, isAdmin } = require('../middlewares/auth')

router.get('/',authentication, isAdmin, AdminController.home)
router.post('/login', AdminController.login)

module.exports = router