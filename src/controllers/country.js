const { country } = require('../../models')

exports.getCountrys = async (req, res) => {
    try {
        const data = await country.findAll({
            attributes: ["id", "name"]
        })

        res.send({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "No data found"
        })
    }
}

exports.getCountry = async (req, res) => {
    try {
        const { id } = req.params
        const data = await country.findOne({
            where: {
                id
            },
            attributes: ["id", "name"]
        })

        res.send({
            status: "success",
            data
        })
    } catch (error) {
        res.send({
            status: "failed",
            message: "No data found"
        })
    }
}

exports.addCountry = async (req, res) => {
    try {
        const allCountry = await country.findAll()
        const isAlreadyExist = allCountry.find(item => req.body.name === item.name)

        if (isAlreadyExist) {
            return res.status(400).send({
                status: "failed",
                message: "Country name already exist"
            })
        }

        res.send({
            status: "success",
            message: "Add country finished"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}