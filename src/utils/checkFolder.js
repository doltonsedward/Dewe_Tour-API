const fs = require('fs')
const avatar_dir = './uploads/avatar-external'
const proof = './uploads/proof'
const trips = './uploads/trips'

const checkFolder = () => {
    if (!fs.existsSync(avatar_dir)) fs.mkdirSync(avatar_dir)
    if (!fs.existsSync(proof)) fs.mkdirSync(proof)
    if (!fs.existsSync(trips)) fs.mkdirSync(trips)
}

module.exports = checkFolder