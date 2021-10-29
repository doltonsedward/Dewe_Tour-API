const { transaction } = require('../../models')

exports.addTransaction = async (req, res) => {
    try {
        await transaction.create(req.body)

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

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await transaction.findAll()
        
        res.send({
            status: "success",
            transactions
        })
    } catch (error) {
        console.log(error)
        res.status.send({
            status: "failed",
            message: "Server error"
        })
    }
}