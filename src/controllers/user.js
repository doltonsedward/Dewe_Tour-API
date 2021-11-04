const { user } = require('../../models')

exports.getUsers = async (req, res) => {
    try {
        const data = await user.findAll()
        
        res.send({
            status: "success",
            data
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
        const idUser = req.user.id
        const id = idUser

        const data = await user.findOne({
            where: {
                id
            }
        })

        console.log(idUser)

        if (!data) {
            return res.status(404).send({
                status: "failed",
                message: "User not found"
            })
        }
        
        if (req.user.role === 'admin') {
            return res.send({
                status: "success",
                data
            })
        // check if token id equals or not with id params
        } else if (req.user.id !== parseInt(id)) { // req.user from auth
            return res.status(400).send({
                status: "failed",
                message: "Access Denied!"
            })
        }

        
        res.send({
            status: "success",
            data
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
        await user.update({...req.body}, {
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