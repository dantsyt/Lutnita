require('./db/mongoose');
const Artist = require('./models/artist');

const deleteAndDisplay = async (id, desc) => {
    const artist = await Artist.findByIdAndDelete(id)
    const all = await Artist.find({ description: desc })
    return all
}

deleteAndDisplay('64ff81e4eca2ed40de87f8ec', 'Lorem ipsum').then((all) => {
    for (one of all) {
        console.log(one.firstname)
    }
}).catch((e) => {
    console.log(e)
})