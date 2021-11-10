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
        console.log(error)
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

        console.log(req.body)

        const data = await country.create(req.body)


        res.send({
            status: "success",
            message: "Add country finished",
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}


// update country
exports.updateCountry = async (req, res) => {
    try {
        const { id } = req.params
        await country.update(req.body, {
            where: { 
                id 
            }
        })

        res.send({
            status: "success",
            message: `Update country id:${id} finished`,
            data: req.body
        })
    } catch (error) {
        console.log(error)

        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}


// delete country
exports.deleteCountry = async (req, res) => {
    try {
        console.log('successs')
        const { id } = req.params

        const allCountry = await country.findOne({ 
            where: {
                id
            } 
        })

        if (!allCountry) {
            return res.status(500).send({
                status: "failed",
                message: "Data not found"
            })
        }
        
        await country.destroy({
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Delete country id:${id} finished`
        })
    } catch (error) {
        console.log(error)

        res.send({
            status: "failed",
            message: "Server error"
        })
    }
}