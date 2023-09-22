const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    nameImg: String,
    description: String,
    imgpath: Array,
})

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist