const { trip, country } = require('../../models')
const cloudinaryUploadMultiple = require('../utils/cloudinaryUploadMultiple')
const rmFolder = require('../utils/rmFolder')
const checkFolder = require('../utils/checkFolder')

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
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
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
        const folderName = process.env.CLOUDINARY_TRIP_FOLDER || "dev_trip-dewetour"
        for (let file of image) {
            const { path } = file
            const newPath = await cloudinaryUploadMultiple(path, folderName)
            allImage.push(newPath)
        }

        const imageFileToString = JSON.stringify(allImage)
        rmFolder('./uploads/trips')
        checkFolder()

        if (isAlreadyExist) {
            return res.status(400).send({
                status: "failed",
                message: "Trip name already exist"
            })
        }
        
        await trip.create({
            ...req.body,
            image: imageFileToString
        })

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

exports.deleteTrip = async (req, res) => {
    try {
        const { id } = req.params

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