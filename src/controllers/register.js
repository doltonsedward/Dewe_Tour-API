const { user } = require('../../models')

exports.addUsers = async (req, res) => {
    try {
        await user.create(req.body)

        res.send({
            status: "success",
            message: "Add user finished"
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "Server Error"
        })
    }
} 