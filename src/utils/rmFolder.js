const fs = require('fs')

const rmFolder = (path) => {
    fs.rmdirSync(path, { recursive: true })
}

module.exports = rmFolder