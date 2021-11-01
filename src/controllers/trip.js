const fs = require('fs')
const path = require('path')
const { trip, country } = require('../../models')

exports.getTrips = async (req, res) => {
    try {
        const data = await trip.findAll({
            include: [
              {
                model: country,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          });

        res.send({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error)

        res.status(400).send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.detailTrip = async (req, res) => {
    try {
        const { id } = req.params
        const data = await trip.findOne({
            where: {
                id
            }
        })

        res.send({
            status: "success",
            data
        })
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.addTrip = async (req, res) => {
    try {
        const allTrip = await trip.findAll()
        const isAlreadyExist = allTrip.find(item => req.body.title === item.title)

        const { image } = req.files
        const allImage = []
        for (let item of image) {
            allImage.push(item.filename)
        }

        const imageFileToString = JSON.stringify(allImage)

        if (isAlreadyExist) {
            return res.status(400).send({
                status: "failed",
                message: "Trip name already exist"
            })
        }
        
        const data = await trip.create({
            ...req.body,
            image: imageFileToString
        })

        res.send({
            status: "success",
            message: "Add trip finished",
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

exports.deleteTrip = async (req, res) => {
    try {
        const { id } = req.params
        const data = await trip.findOne({ 
            where: {
                id
            } 
        })

        const image = data.image
        const imgStringToArray = JSON.parse(image)

        console.log(imgStringToArray)

        for (let item of imgStringToArray) {
            console.log(item)
            fs.unlinkSync(path.join(__dirname, '../../uploads/proof/' + item)) 
        }

        await trip.destroy({
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