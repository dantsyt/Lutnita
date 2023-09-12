const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    date: String,
    description: String,
    imgpath: String,
})

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist