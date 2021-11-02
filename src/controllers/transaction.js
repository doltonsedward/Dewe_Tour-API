const fs = require('fs')
const path = require('path')
const jwt_decode = require('jwt-decode')
const { transaction, trip, user } = require('../../models')

exports.addTransaction = async (req, res) => {
    try {
        const { ...data } = req.body

        await transaction.create({
            ...data
        })

        res.send({
            status: "success",
            message: "Add transaction finished"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params
        const { attachment } = req.files

        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]
        const tokenDecode = jwt_decode(token) // decoded token

        const userInfo = await transaction.findOne({
            where: {
                id
            }
        })

        console.log(userInfo.userId)

        if (tokenDecode.role === 'admin') {
            await transaction.update({
                ...req.body,
                attachment: attachment[0].filename
            }, {
                where: {
                    id
                }
            })
    
            return res.send({
                status: "success",
                message: `Update id: ${id} finished`
            })
        } else if (userInfo.userId !== tokenDecode.id) {
            return res.status(400).send({
                status: "failed",
                message: "You dont have access for this transaction"
            })
        } 

        await transaction.update({
            ...req.body,
            attachment: attachment[0].filename
        }, {
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Update id: ${id} finished`
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params

        const data = await transaction.findOne({ 
            where: {
                id
            } 
        })

        const image = data.attachment

        image ? fs.unlinkSync(path.join(__dirname, '../../uploads/proof/' + image)) : ''

        await transaction.destroy({
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Delete id: ${id} finished`
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await transaction.findAll({
            include: [
                {
                    model: trip,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model: user,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        
        res.send({
            status: "success",
            data: transactions
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.getTransaction = async (req, res) => {
    try {
        const { id } = req.params
        const transactions = await transaction.findOne({
            where: {
                id
            }
        })

        res.send({
            status: "success",
            transactions
        })
    } catch (error) {
        
    }
}