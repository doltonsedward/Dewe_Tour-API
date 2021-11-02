const express = require('express') 
const { getCountrys, addCountry, getCountry, updateCountry, deleteCountry } = require('../controllers/country') 
const { getTrips, addTrip, detailTrip, deleteTrip, updateTrip } = require('../controllers/trip') 
const { addTransaction, getTransactions, deleteTransaction, updateTransaction } = require('../controllers/transaction') 
const { getUsers, deleteUser, updateUser, getUser } = require('../controllers/user') 
const { auth } = require('../middlewares/auth') 
const { register, login } = require('../controllers/auth') 
const { checkAdmin } = require('../middlewares/checkAdmin')  
const { uploadFile } = require('../middlewares/uploadFIle')  
const { maintenceDeleteTrips } = require('../testing/maintenceDeleteTrips')

const router = express.Router() 

router.get('/users', auth, checkAdmin, getUsers) 
router.get('/user/:id', auth, getUser) 
router.delete('/user/:id', auth, checkAdmin, deleteUser) 
router.patch('/user/:id', updateUser) 

router.post('/register', register) 
router.post('/login', login) 

router.get('/countrys', getCountrys) 
router.get('/country/:id', getCountry) 
router.post('/country', auth, checkAdmin, addCountry) 
router.patch('/country/:id', auth, checkAdmin, updateCountry) 
router.delete('/country/:id', auth, checkAdmin, deleteCountry) 

router.get('/trips', getTrips) 
router.post('/trip', auth, checkAdmin, uploadFile("image", 'uploads/trips'), addTrip) 
router.patch('/trip/:id', uploadFile("image", 'uploads/trips'), updateTrip)
router.get('/trip/:id', detailTrip) 
router.delete('/trip/:id', auth, checkAdmin, deleteTrip) 

router.post('/transaction', uploadFile("attachment", 'uploads/proof'), addTransaction) 
router.patch('/transaction/:id', auth, uploadFile("attachment", 'uploads/proof'), updateTransaction) 
router.delete('/transaction/:id', auth,  deleteTransaction) 
router.get('/transactions', auth, checkAdmin, getTransactions) 

router.delete('/maintence/trips', maintenceDeleteTrips) 

module.exports = router