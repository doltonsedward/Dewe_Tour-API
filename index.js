require('dotenv').config()
const express = require('express')

const router = require('./src/routes')
const app = express()
const port = 8080

app.use(express.json())

app.use('/api/v1', router)

app.listen(port, ()=> console.log(`server running at http://localhost:${port}`))