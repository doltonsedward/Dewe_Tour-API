const fs = require('fs')
const path = require('path')
const { transaction, trip, user } = require('../../models')

exports.addTransaction = async (req, res) => {
    try {
        const { ...data } = req.body
        const { attachment } = req.files

        await transaction.create({
            ...data,
            attachment: attachment[0].filename
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
        
    }
}

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params
        const { attachment } = req.files

        await transaction.findOne({
            where: {
                id
            }
        })

        fs.unlink(path.join(__dirname, '../../uploads/proof/' + attachment[0].filename)) 

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