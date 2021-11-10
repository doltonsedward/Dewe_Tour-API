const fs = require('fs')
const path = require('path')
const { user } = require('../../models')

exports.maintenceDeleteAvatar = async (req, res) => {
    try {
        console.log('halo')
        const allUser = await user.findAll()

        let totalImageUser = '' // initialize container of array string

        allUser.map(item => {
            totalImageUser += item.avatar
        })

        fs.readdir('./uploads/avatar-external', (err, files) => {
            files.map(item => {
                if (totalImageUser.indexOf(item) === -1) { // check if file doesnt exist in database
                    fs.unlinkSync(path.join(__dirname, '../../uploads/avatar-external/' + item))
                }
            })
        })
    

        res.send({
            status: "success",
            message: `Profiles clean right now`
        })
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}