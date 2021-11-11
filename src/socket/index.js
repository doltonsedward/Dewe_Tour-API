// import models
const { chat, user } = require('../../models')

const jwt = require('jsonwebtoken')

// import sequelize operator
const { Op } = require('sequelize')

// init global variable for connectedUser
const connectedUser = {}

const socketIo = (io) => {
    io.on("connection", (socket) => {
        console.log('client connected with id: ', socket.id)

        socket.on("disconnect", ()=> {
            console.log("client disconnected")
        })
    })
}

module.exports = socketIo