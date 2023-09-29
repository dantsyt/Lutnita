const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    namepath: String,
    imgpath: Array,
})

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist