require('dotenv').config()
const express = require('express')

const router = require('./src/routes')
const app = express()
const port = 8080

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/api/v1', router)

app.use('/uploads', express.static('uploads'))

app.listen(port, ()=> console.log(`server running at http://localhost:${port}`))