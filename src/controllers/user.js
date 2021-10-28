const { user } = require('../../models')

exports.getUsers = async (req, res) => {
    try {
        const users = await user.findAll()
        
        res.send({
            status: "success",
            users
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "Server Error"
        })
    }
}