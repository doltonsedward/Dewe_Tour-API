const express = require('express')
const { getCountrys, addCountry, getCountry, updateCountry, deleteCountry } = require('../controllers/country')
// const { getTrips, addTrip } = require('../controllers/trip')
// const { addTransaction, getTransactions } = require('../controllers/transaction')
const { getUsers, addUsers, deleteUsers } = require('../controllers/user')

const router = express.Router()

router.get('/users', getUsers)
router.delete('/user/:id', deleteUsers)

router.post('/register', addUsers)

router.get('/countrys', getCountrys)
router.get('/country/:id', getCountry)
router.post('/country', addCountry)
router.patch('/country/:id', updateCountry)
router.delete('/country/:id', deleteCountry)

router.get('/trips', getTrips)
router.post('/trip', addTrip)

// router.get('/transaction', getTransactions)
// router.post('/transaction', addTransaction)

module.exports = router