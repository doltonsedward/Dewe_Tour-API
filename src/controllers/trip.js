const { trip, country } = require('../../models')

exports.getTrips = async (req, res) => {
    try {
        const trips = await trip.findAll({
            include: [
                {
                    model: country,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })

        res.send({
            status: "success",
            trips
        })
    } catch (error) {
        console.log(error)

        res.send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.addTrip = async (req, res) => {
    try {
        await trip.create(req.body)

        res.send({
            status: "success",
            message: "Add trip finished"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}