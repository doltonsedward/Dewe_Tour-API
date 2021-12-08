const fs = require('fs')
const path = require('path')
const { transaction, trip, user, country } = require('../../models')
const cloudinary = require('../thirdparty/cloudinary')
const checkFolder = require('../utils/checkFolder')

exports.addTransaction = async (req, res) => {
    try {
        const { ...data } = req.body

        const response = await transaction.create({
            ...data
        })

        res.send({
            status: "success",
            message: "Add transaction finished",
            response
        })

    } catch (error) {
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

        const dataTrans = await transaction.findOne({
            where: {
                id: idParam
            }
        })

        const folderToUpload = process.env.CLOUDINARY_PROOF_FOLDER || "dev_proof-dewetour"
        cloudinary.uploader.upload(attachment[0].path, { folder: folderToUpload }, async (error, result) => {
            if (error) {
                if (error.code === 'ENOTFOUND') {
                    return res.status(500).send({
                        status: "failed",
                        message: "Cloud not connected"
                    })
                }

                return res.status(500).send({
                    status: "failed",
                    message: "Upload file error"
                })
            }

            if (role === 'admin') {
                await transaction.update({
                    ...req.body,
                    attachment: result.secure_url
                }, {
                    where: {
                        id: idParam
                    }
                })

                return res.send({
                    status: "success",
                    message: `Update id: ${id} finished`
                })
            } else if (dataTrans.userId !== id) {
                return res.status(403).send({
                    status: "failed",
                    message: "You don't have access to this"
                })
            }
    
            await transaction.update({
                ...req.body,
                attachment: result.secure_url
            }, {
                where: {
                    id: idParam
                }
            })

            fs.rmdirSync('./uploads/proof', { recursive: true })
            checkFolder()
    
            res.send({
                status: "success",
                message: `Update transaction finished`
            })

        })
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.updateTransactionInAdmin = async (req, res) => {
    try {
        const { id } = req.params

        await transaction.update({
            ...req.body
        }, {
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Update transaction finished`
        })
    } catch (error) {
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
            },
            order: [["status", "DESC"]]
        })
        
        res.send({
            status: "success",
            data: transactions
        })
        
    } catch (error) {
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
        res.status(500).send({
            status: "failed",
            message: "Internal server error"
        })
    }
}