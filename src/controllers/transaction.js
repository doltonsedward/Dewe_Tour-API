const fs = require('fs')
const path = require('path')
const { transaction, trip, user, country } = require('../../models')

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
        const idParam = req.params.id
        const { id, role } = req.user
        const { attachment } = req.files

        const userInfo = await transaction.findOne({
            where: {
                id: idParam
            }
        })

        if (role === 'admin') {
            await transaction.update({
                ...req.body,
                attachment: process.env.PATH_ATTACHMENT + attachment[0].filename
            }, {
                where: {
                    id: idParam
                }
            })
    
            return res.send({
                status: "success",
                message: `Update id: ${id} finished`
            })
        } else if (userInfo.userId !== id) {
            return res.status(400).send({
                status: "failed",
                message: "You dont have access for this transaction"
            })
        } 

        await transaction.update({
            ...req.body,
            attachment: process.env.PATH_ATTACHMENT + attachment[0].filename
        }, {
            where: {
                id: idParam
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

exports.updateTransactionById = async (req, res) => {
    try {
        const idParam = req.params.id
        const { role } = req.user
        const { attachment } = req.files

        console.log(attachment[0].filename)

        if (role === 'admin') {
            await transaction.update({
                ...req.body,
                attachment: process.env.PATH_ATTACHMENT + attachment[0].filename
            }, {
                where: {
                    id: idParam
                }
            })
    
            return res.send({
                status: "success",
                message: `Update id: ${idParam} finished`
            })
        } 

        await transaction.update({
            ...req.body,
            attachment: process.env.PATH_ATTACHMENT + attachment[0].filename
        }, {
            where: {
                id: idParam
            }
        })

        res.send({
            status: "success",
            message: `Update id: ${idParam} finished`
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
        const { id } = req.user
        const data = await transaction.findAll({
            include: [
                {
                    model: trip,
                    include: [
                        {
                            model: country,
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            }
                        }
                    ],
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model: user,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    },
                    where: {
                        id
                    }
                }
            ]
        })

        res.send({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error)
    }
}