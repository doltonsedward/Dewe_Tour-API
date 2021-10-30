const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(400).send({ message: "Access Denied!" })

    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = verified
        next()
    } catch (error) {
        req.status(400).send({ message: "Invalid Token" })
    }
}