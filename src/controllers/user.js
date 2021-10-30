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

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params
        const users = await user.findOne({
            where: {
                id
            }
        })

        res.send({
            sttus: "success",
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

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        await user.destroy({
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Delete user id:${id} finished`
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        await user.update(req.body, {
            where: {
                id
            }
        })

        res.send({
            status: "success",
            message: `Update user id:${id} finished`,
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "Server error"
        })
    }
}