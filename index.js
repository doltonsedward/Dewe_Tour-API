require('dotenv').config()
const express = require('express')
const cors = require('cors')

// import server and http
const http = require('http')
const {Server} = require('socket.io')

const router = require('./src/routes')
const app = express()
const port = 8080

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'https://dewe-tour.vercel.app' || "http://localhost:3000" // we must define cors because our client and server have different origin. and dont use / in back
    }
})

// import socket function and call with parameter io
require('./src/socket')(io)

app.use(express.json())
app.use(cors())

// Add endpoint grouping and router
app.use('/api/v1', router)
app.use('/uploads', express.static('uploads'))

server.listen(process.env.PORT || port, () => console.log(`server running at http://localhost:${port}`))