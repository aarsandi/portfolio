const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

const { authentication, isAdmin } = require('../middlewares/auth')

router.get('/',authentication, isAdmin, UserController.browse)
router.get('/:id',authentication, isAdmin, UserController.read)
router.post('/add',authentication, isAdmin, UserController.add)
router.put('/edit/:id',authentication, isAdmin, UserController.edit)
router.delete('/delete/:id',authentication, isAdmin, UserController.delete)

module.exports = router