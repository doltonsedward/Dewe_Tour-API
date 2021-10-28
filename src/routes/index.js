const express = require('express')
const { getUsers } = require('../controllers/user')
const { addUsers } = require('../controllers/register')

const router = express.Router()

router.get('/users', getUsers)
router.post('/register', addUsers)
// router.get('/country', addUsers)

module.exports = router