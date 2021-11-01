const fs = require('fs')
const path = require('path')
const { transaction, trip, user } = require('../../models')

exports.addTransaction = async (req, res) => {
    try {
        const { ...data } = req.body
        const { attachment } = req.files

        const allImage = []
        for (let item of attachment) {
            allImage.push(item.filename)
        }

        const imageFileToString = JSON.stringify(allImage)

        await transaction.create({
            ...data,
            attachment: imageFileToString
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

        const allImage = []
        for (let item of attachment) {
            allImage.push(item.filename)
        }

        const imageFileToString = JSON.stringify(allImage)

        await transaction.update({
            ...req.body,
            attachment: imageFileToString
        }, {
            where: {
                id
            }
        })
        
    } catch (error) {
        
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
        const imgStringToArray = JSON.parse(image)

        for (let item of imgStringToArray) {
            fs.unlinkSync(path.join(__dirname, '../../uploads/proof/' + item)) 
        }

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