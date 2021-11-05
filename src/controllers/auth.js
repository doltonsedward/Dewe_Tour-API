const { user } = require('../../models')

const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const avatarDefault = require('../utils/avatar')

// register section
exports.register = async (req, res) => {
    const schema = Joi.object({
        fullName: Joi.string().min(5).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().min(8),
        address: Joi.string().min(6)
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).send({
            error: { message: error.details[0].message }
        })
    }

    
    try {
        const allUser = await user.findAll()
        const nameExist = allUser.find(item => req.body.fullName === item.fullName)
        const emailExist = allUser.find(item => req.body.email === item.email)

        if (nameExist) {
            return res.status(400).send({
                status: "failed",
                message: "Full Name already exist"
            })
        } else if (emailExist) {
            return res.status(400).send({
                status: "failed",
                message: "Email already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        const { fullName, email, phone, address } = req.body

        const randomAvatar = Math.floor(Math.random() * (avatarDefault.length))

        const newUser = await user.create({
            fullName,
            email,
            password: hashedPassword,
            phone,
            address,
            role: 'user',
            avatar: process.env.PATH_AVATAR + avatarDefault[randomAvatar]
        })

        res.status(200).send({
            status: "success",
            data: {
                fullName: newUser.fullName,
                email: newUser.email
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}


// login section
exports.login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).send({
            error: { message: error.details[0].message }
        })
    }

    try {
        const userExist = await user.findOne({
            where: {
                email: req.body.email
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }
        })

        const isPassValid = await bcrypt.compare(req.body.password, userExist.password)

        if (!isPassValid) {
            return res.status(400).send({
                status: "failed",
                message: "credential is invalid"
            })
        }

        // create jwt token, and add id, role to token. expiresIn for expires date of token
        const token = jwt.sign({ id: userExist.id, role: userExist.role }, process.env.TOKEN_KEY, { expiresIn: '1d' }) 
        res.status(200).send({
            status: "success",
            data: {
                fullName: userExist.fullName,
                email: userExist.email,
                role: userExist.role,
                avatar: userExist.avatar,
                token
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "Server error"
        })
    }
}

exports.checkAuth = async (req, res) => {
    try {
        const { id } = req.user
        
        const dataUser = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt", "password"],
            }
        })

        if (!dataUser) {
            return res.status(404).send({
                status: "failed",
            })
        }
        
        res.send({
            status: "success",
            data: {
                user: {
                    id: dataUser.id,
                    fullName: dataUser.fullName,
                    email: dataUser.email,
                    phone: dataUser.phone,
                    address: dataUser.address,
                    role: dataUser.role,
                    avatar: dataUser.avatar,
                },
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Server error'
        })
    }
}