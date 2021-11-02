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
            ]
          });

        let dataImage = []

        res.send({
            status: "success",
            data: data.map((item) => {
                const itemValue = JSON.parse(item.dataValues.image)

                const newData = []
                for (let i = 0; i < itemValue.length; i++) {
                    newData.push(`${process.env.PATH_TRIPS}${itemValue[i]}`)
                }

                dataImage = newData

                // change default image in data to new link image
                item.dataValues.image = dataImage
                return item
            })
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

exports.updateTrip = async (req, res) => {
    try {
        const { id } = req.params
        const { image } = req.files

        const dataImage = []

        image.map(item => {
            dataImage.push(item.filename)
        })

        await trip.update({
            image:  JSON.stringify(dataImage)
        }, {
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Update id: ${id} finished`
        })
        
    } catch (error) {
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

        fs.readdir('./uploads/trips', (err, files) => {
            files.map((item) => {
                if (image.indexOf(item) !== -1) {
                    fs.unlinkSync(path.join(__dirname, '../../uploads/trips/' + item))
                }
            })
        })

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