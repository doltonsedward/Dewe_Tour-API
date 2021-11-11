const express = require('express') 
const { getCountrys, addCountry, getCountry, updateCountry, deleteCountry } = require('../controllers/country') 
const { getTrips, addTrip, detailTrip, deleteTrip, updateTrip } = require('../controllers/trip') 
const { addTransaction, getTransactions, deleteTransaction, updateTransaction, getTransaction, updateTransactionById } = require('../controllers/transaction') 
const { getUsers, deleteUser, updateUser, getUser, updateUserById } = require('../controllers/user') 
const { auth } = require('../middlewares/auth') 
const { register, login, checkAuth } = require('../controllers/auth') 
const { checkAdmin } = require('../middlewares/checkAdmin')  
const { uploadFile } = require('../middlewares/uploadFIle')  
const { maintenceDeleteTrips } = require('../testing/maintenceDeleteTrips')
const { maintenceDeleteTransaction } = require('../testing/maintenceDeleteTransaction')
const { maintenceDeleteAvatar } = require('../testing/maintenceDeleteAvatar')

const router = express.Router() 

router.get('/users', auth, checkAdmin, getUsers) 
router.get('/user', auth, getUser) 
router.delete('/user/:id', auth, checkAdmin, deleteUser) 
router.patch('/user', auth, uploadFile("avatar", 'uploads/avatar-external'), updateUser) 
router.patch('/user/:id', auth, updateUserById) 

router.get('/check-auth', auth, checkAuth) 
router.post('/register', register) 
router.post('/login', login) 

router.get('/countrys', getCountrys) 
router.get('/country/:id', getCountry) 
router.post('/country', auth, checkAdmin, addCountry) 
router.delete('/country/:id', auth, checkAdmin, deleteCountry) 
router.patch('/country/:id', auth, checkAdmin, updateCountry) 

router.get('/trips', getTrips) 
router.get('/trip/:id', detailTrip) 
router.post('/trip', auth, uploadFile("image", 'uploads/trips'), addTrip) 
router.patch('/trip/:id', auth, updateTrip) 
router.delete('/trip/:id', auth, checkAdmin, deleteTrip) 

router.get('/transactions', auth, checkAdmin, getTransactions) 
router.get('/transaction', auth, getTransaction) 
router.post('/transaction', uploadFile("attachment", 'uploads/proof'), addTransaction) 
router.patch('/transaction/', auth, uploadFile("attachment", 'uploads/proof'), updateTransaction) 
router.patch('/transaction/:id', auth, uploadFile("attachment", 'uploads/proof'), updateTransactionById) 
router.delete('/transaction/:id', auth,  deleteTransaction) 

router.delete('/maintence/trips', maintenceDeleteTrips) 
router.delete('/maintence/transactions', maintenceDeleteTransaction) 
router.delete('/maintence/profiles', maintenceDeleteAvatar) 

module.exports = router