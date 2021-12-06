const cloudinary = require('../thirdparty/cloudinary')

const cloudinaryUploadMultiple = async (file, folderName) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, { folder: folderName }, (err, res) => {
            if (err) {
                return res.status(500).send({
                    status: "failed",
                    message: "Upload image error"
                })
            }

            resolve(res.secure_url)
        })
    }) 
}

module.exports = cloudinaryUploadMultiple