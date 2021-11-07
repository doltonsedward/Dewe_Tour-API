const fs = require('fs')
const path = require('path')
const { user } = require('../../models')

exports.maintenceDeleteAvatar = async (req, res) => {
    try {
        const allUser = user.findAll()

        let totalImageUser = '' // initialize container of array string

        allUser.map(item => {
            totalImageUser += item.avatar
        })

        fs.readdir('./uploads/avatar-external', (err, files) => {
            files.map(item => {
                if (totalImageUser.indexOf(item) === -1) { // check if file doesnt exist in database
                    fs.unlinkSync(path.join(__dirname, '../../uploads/avatar-external' + item))
                }
            })
        })
    } catch (error) {
        
    }
}