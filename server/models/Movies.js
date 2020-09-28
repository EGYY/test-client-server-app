const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MovieSchema = new Schema({
    name: String,
    genre: String,
    raiting: Number,
    dirId: String
})

module.exports = mongoose.model('movies', MovieSchema)