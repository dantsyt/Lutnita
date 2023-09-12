const mongoose = require('mongoose')

const exhibSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    exhibname: String,
    date: String,
    description: String,
    imgpath: String,
})

const Exhibition = mongoose.model('Exhibition', exhibSchema);

// const solo = new Exhibition({
//     name: "Solo",
//     imgpath: "img/flaviucacoveanu.png",
//     date: "18 Aug 2023 — 18 Oct 2023",
//     description: "Lorem ipsum",
//     firstname: "Flaviu",
//     lastname: "Cacoveanu",
// });

// solo.save()
//     .then(() => {
//         console.log(solo)
//     })
//     .catch((error) => {
//         console.log('Error!', error)
//     });

module.exports = Exhibition