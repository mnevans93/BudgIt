const express = require('express')
const router = express.Router()
const { checkToken, dataController, apiController } = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// New account route
router.post('/', dataController.create, apiController.auth)
// Login route
router.post('/login', dataController.login, apiController.auth)
// Token check route
router.get('/check-token', ensureLoggedIn, checkToken)

module.exports = router
