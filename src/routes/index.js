const express = require('express')
// const { getCountrys, addCountry, getCountry, updateCountry, deleteCountry } = require('../controllers/country')
// const { addTransaction, getTransactions } = require('../controllers/transaction')
const { addUsers } = require('../controllers/user')

const router = express.Router()

// router.get('/users', getUsers)

router.post('/register', addUsers)

// router.get('/country', getCountrys)
// router.get('/country/:id', getCountry)
// router.post('/country', addCountry)
// router.patch('/country/:id', updateCountry)
// router.delete('/country/:id', deleteCountry)

// router.get('/transaction', getTransactions)
// router.post('/transaction', addTransaction)

module.exports = router