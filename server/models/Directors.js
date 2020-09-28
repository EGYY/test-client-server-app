const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DirectorsSchema = new Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('directors', DirectorsSchema)