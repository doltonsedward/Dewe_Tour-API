const { user } = require('../../models')

const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const schema = Joi.object({
        fullName: Joi.string().min(5).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().min(5),
        address: Joi.string().min(5)
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).send({
            error: { message: error.details[0].message }
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        const { fullName, email, phone, address } = req.body
        const newUser = await user.create({
            fullName,
            email,
            password: hashedPassword,
            phone,
            address
        })

        const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY)

        res.status(200).send({
            status: "success",
            data: {
                email: newUser.email,
                password: newUser.password,
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

        const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_KEY)
        res.status(200).send({
            status: "success",
            data: {
                fullName: userExist.fullName,
                email: userExist.email,
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