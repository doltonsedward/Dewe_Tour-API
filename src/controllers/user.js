const { user } = require('../../models')
const fs = require('fs')
const cloudinary = require('../thirdparty/cloudinary')
const checkFolder = require('../utils/checkFolder')

exports.getUsers = async (req, res) => {
    try {
        const data = await user.findAll()
        
        res.send({
            status: "success",
            data
        })
    } catch (error) {
        res.status(500).send({
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
        res.status(500).send({
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
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.user
        const { avatar } = req.files
        
        const folderToUpload = process.env.CLOUDINARY_AVATAR_FOLDER || "dev_avatar-dewetour"
        cloudinary.uploader.upload(avatar[0].path, { folder: folderToUpload }, async (error, result) => {
            if (error) {
                if (error.code === 'ENOTFOUND') {
                    return res.status(500).send({
                        status: "failed",
                        message: "Cloud not connected"
                    })
                }

                return res.status(500).send({
                    status: "failed",
                    message: "There is not connected to cloud"
                })
            }

            await user.update(
                {
                    ...req.body,
                    avatar: result.secure_url
                }, {
                where: {
                    id
                }
            })

            fs.rmdirSync('./uploads/avatar-external', { recursive: true })
            checkFolder()
            res.send({
                status: "success",
                message: `Update finished`,
            })
        })

    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Internal server error"
        })
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const { id } = req.user

        await user.update({...req.body}, {
            where: {
                id
            }
        })
        
        res.send({
            status: 'success',
            message: "Update user finished"
        })
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "Internal server error"
        })
    }
}