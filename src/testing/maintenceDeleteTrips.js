const fs = require('fs')
const path = require('path')
const { trip } = require('../../models')

exports.maintenceDeleteTrips = async (req, res) => {
    try {
        const allTrips = await trip.findAll()

        let totalImageTrips = ''

        allTrips.map(item => {
            console.log(item.image)
            totalImageTrips += item.image
        })

        console.log(totalImageTrips)

        fs.readdir('./uploads/trips', (err, files) => {
            files.map((item) => {
                if (totalImageTrips.indexOf(item) === -1) {
                    fs.unlinkSync(path.join(__dirname, '../../uploads/trips/' + item))
                }
            })
        })
        // allTrips.map(item => {

        // })
        
        res.send({
            status: "success",
            message: "Trip clen right now"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}