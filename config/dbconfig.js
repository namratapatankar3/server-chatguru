const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection;
db.on('connected', () => {
    console.log("successful connection")
})
db.on('error', () => {
    console.log("problem with db connection")
})

module.exports = db