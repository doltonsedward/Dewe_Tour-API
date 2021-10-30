const express = require('express')
const { getCountrys, addCountry, getCountry, updateCountry, deleteCountry } = require('../controllers/country')
const { getTrips, addTrip } = require('../controllers/trip')
const { addTransaction, getTransactions } = require('../controllers/transaction')
const { getUsers, deleteUser, updateUser, getUser } = require('../controllers/user')
const { auth } = require('../middlewares/auth')
const { register, login } = require('../controllers/auth')

const router = express.Router()

router.get('/users', getUsers)
router.get('/user/:id', auth, getUser)
router.delete('/user/:id', deleteUser)
router.patch('/user/:id', updateUser)

router.post('/register', register)
router.post('/login', login)

router.get('/countrys', getCountrys)
router.get('/country/:id', getCountry)
router.post('/country', addCountry)
router.patch('/country/:id', updateCountry)
router.delete('/country/:id', deleteCountry)

router.get('/trips', getTrips)
router.post('/trip', addTrip)

// need fixed
router.get('/transactions', getTransactions)
router.post('/transaction', addTransaction)

module.exports = router