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
                const itemValue = JSON.parse(item.image)

                const newData = []
                for (let i = 0; i < itemValue.length; i++) {
                    newData.push(itemValue[i])
                }

                dataImage = newData

                // change default image in data to new link image
                item.image = dataImage
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
            },
            include: [
                {
                    model: country,
                    attributes: {
                    exclude: ["createdAt", "updatedAt"],
                    },
                },
            ]
        })

        const { accomodation, countryId, dateTrip, day, description, eat, image, night, price, quota, filled, title, transportation, type } = data

        const dataImage = JSON.parse(image)
        const newDataImage = []
        for (let i = 0; i < dataImage.length; i++) {
            newDataImage.push(dataImage[i])
        }

        res.send({
            status: "success",
            data: { 
                id,
                accomodation, 
                countryId, 
                dateTrip,  
                day,
                description,
                eat,
                image: newDataImage,
                night,
                price,
                quota,
                filled,
                title,
                transportation,
                type,
                country: data.country
            }
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

        console.log(req.body)

        await trip.update({...req.body}, {
            where: {
                id
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