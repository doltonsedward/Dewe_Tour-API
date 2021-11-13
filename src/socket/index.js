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

        const userId = socket.handshake.query.id
        connectedUser[userId] = socket.id
        
        // socket.on("load admin online", )
        console.log(connectedUser, 'connected user')

        socket.on("load admin contact", async () => {
            try {
                const adminContact = await user.findOne({
                    where: {
                        role: "admin"
                    },
                    attributes: {
                      exclude: ["createdAt", "updatedAt", "password"],
                    }
                })

                // emit event to send admin data on event "admin contact"
                socket.emit("admin contact", adminContact)
            } catch (error) {
                console.log(error)
            }
        })

        socket.on("load customer contacts", async () => {
            try {
                let customerContact = await user.findAll({
                    include: [
                        {
                            model: chat,
                            as: "recipientMessage",
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"]
                            }
                        },
                        {
                            model: chat,
                            as: "senderMessage",
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"]
                            }
                        }
                    ],
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password"]
                    },
                })

                customerContact = JSON.parse(JSON.stringify(customerContact))

                socket.emit("customer contact", customerContact)
            } catch (error) {
                console.log(error)
            }
        })

        socket.on("load message", async (payload) => {
            try {
                const token = socket.handshake.auth.token
                const tokenKey = process.env.TOKEN_KEY
                const verified = jwt.verify(token, tokenKey)
                
                const idRecipient = payload
                const idSender = verified.id

                const data = await chat.findAll({
                    where: {
                        idSender: {
                            [Op.or]: [idRecipient, idSender]
                        },
                        idRecipient: {
                            [Op.or]: [idRecipient, idSender]
                        }
                    },
                    include: [
                        {
                            model: user,
                            as: "recipient",
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "password"],
                            },
                        },
                        {
                            model: user,
                            as: "sender",
                            attributes: {
                                exclude: ["createdAt", "updatedAt", "password"],
                            },
                        }
                    ],
                    order: [["createdAt", "ASC"]],
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "idRecipient", "idSender"]
                    }
                })

                socket.emit("messages", data);
            } catch (error) {
                console.log(error)
            }
        })

        socket.on("disconnect", () => {
            console.log("client disconnected")
            delete connectedUser[userId]
        })
    })
}

module.exports = socketIo