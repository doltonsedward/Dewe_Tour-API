const fs = require('fs')
const path = require('path')
const { transaction } = require('../../models')

exports.maintenceDeleteTransaction = async (req, res) => {
    try {
        const allTransaction = await transaction.findAll()

        let totalImageTrips = '' // initialize container of array string

        allTransaction.map(item => {
            totalImageTrips += item.attachment
        })

        fs.readdir('./uploads/proof', (err, files) => {
            files.map((item) => {
                if (totalImageTrips.indexOf(item) === -1) { // check if file doesnt exist in database
                    fs.unlinkSync(path.join(__dirname, '../../uploads/proof/' + item))
                }
            })
        })
        
        res.send({
            status: "success",
            message: "Transaction clean right now"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}