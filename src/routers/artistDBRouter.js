const express = require('express')
const artistsDBRouter = new express.Router()

const Artist = require('../models/artistMod')

artistsDBRouter.use(express.json())

artistsDBRouter.get('/getArtists', async (req, res) => {
    try {
        const artist = await Artist.find({})
        res.send(artist)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

artistsDBRouter.get('/getOneArtist/:lastname', async (req, res) => {
    const lastname = req.params.lastname
    try {
        const artist = await Artist.findOne({ lastname })
        if (!artist) { return res.status(404).send('404 artists, not one found') }
        res.send(artist)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

artistsDBRouter.post('/postArtist', async (req, res) => {
    const artist = Artist(req.body)
    try {
        await artist.save()
        res.status(201).send(artist)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

artistsDBRouter.post('/editArtist', async (req, res) => {
    try {
        await Artist.updateOne({ lastname: "godzina" }, {
            captions: ["A Room of One's Own, 2021\nElectric engine, bearing system, gas tube, metal\n5.20m x 0.55m x 0.55m\nM HKA Museum, Antwerp, Belgium",
                "A Room of One's Own, 2021\nElectric engine, bearing system, gas tube, metal\n5.20m x 0.55m x 0.55m\nM HKA Museum, Antwerp, Belgium",
                "A Room of One's Own, 2021\nElectric engine, bearing system, gas tube, metal\n5.20m x 0.55m x 0.55m\nM HKA Museum, Antwerp, Belgium",
                "A Room of One's Own, 2021\nElectric engine, bearing system, gas tube, metal\n5.20m x 0.55m x 0.55m\nM HKA Museum, Antwerp, Belgium",
                "A Room of One's Own, 2021\nElectric engine, bearing system, gas tube, metal\n5.20m x 0.55m x 0.55m\nM HKA Museum, Antwerp, Belgium",
                "Future Archaeology, 2020\nMetal tubes, metal chains, electric engines, fluorescent tubes, electrical timers, light bulb, water.\nVariable dimensions\nErgo Collective Art Space, Athens, Greece",
                "Future Archaeology, 2020\nMetal tubes, metal chains, electric engines, fluorescent tubes, electrical timers, light bulb, water.\nVariable dimensions\nErgo Collective Art Space, Athens, Greece",
                "Future Archaeology, 2020\nMetal tubes, metal chains, electric engines, fluorescent tubes, electrical timers, light bulb, water.\nVariable dimensions\nErgo Collective Art Space, Athens, Greece",
                "Future Archaeology, 2020\nMetal tubes, metal chains, electric engines, fluorescent tubes, electrical timers, light bulb, water.\nVariable dimensions\nErgo Collective Art Space, Athens, Greece",
                "Future Archaeology, 2020\nMetal tubes, metal chains, electric engines, fluorescent tubes, electrical timers, light bulb, water.\nVariable dimensions\nErgo Collective Art Space, Athens, Greece",
                "Future Archaeology, 2020\nMetal tubes, metal chains, electric engines, fluorescent tubes, electrical timers, light bulb, water.\nVariable dimensions\nErgo Collective Art Space, Athens, Greece",
                "Future Archaeology, 2020\nMetal tubes, metal chains, electric engines, fluorescent tubes, electrical timers, light bulb, water.\nVariable dimensions\nErgo Collective Art Space, Athens, Greece",
                "Future Archaeology, 2020\nMetal tubes, metal chains, electric engines, fluorescent tubes, electrical timers, light bulb, water.\nVariable dimensions\nErgo Collective Art Space, Athens, Greece",
                "Future Archaeology, 2020\nMetal tubes, metal chains, electric engines, fluorescent tubes, electrical timers, light bulb, water.\nVariable dimensions\nErgo Collective Art Space, Athens, Greece",
                "Horology, 2023\nIron, engines, bamboo branches, stones, wooden containers, hour hands, minute hands, second hands, pendulums, rope\nVariable dimensions\nArt Partout Gallery, Antwerp, Belgium",
                "Horology, 2023\nIron, engines, bamboo branches, stones, wooden containers, hour hands, minute hands, second hands, pendulums, rope\nVariable dimensions\nArt Partout Gallery, Antwerp, Belgium",
                "Horology, 2023\nIron, engines, bamboo branches, stones, wooden containers, hour hands, minute hands, second hands, pendulums, rope\nVariable dimensions\nArt Partout Gallery, Antwerp, Belgium",
                "Noetic, 2022\nIron, magnets, electric engines\n60cm x 60cm x 15cm\nIMAL, Center for digital cultures and technology, Brussels, Belgium",
                "Noetic, 2022\nIron, magnets, electric engines\n60cm x 60cm x 15cm\nIMAL, Center for digital cultures and technology, Brussels, Belgium",
                "Noetic, 2022\nIron, magnets, electric engines\n60cm x 60cm x 15cm\nIMAL, Center for digital cultures and technology, Brussels, Belgium",
                "Noetic, 2022\nIron, magnets, electric engines\n60cm x 60cm x 15cm\nIMAL, Center for digital cultures and technology, Brussels, Belgium",
                "The Runner’s Body, 2019\nTree trunks, speakers, electronic amplifier.\nVariable dimensions.\nArt’s Institute, Antwerp, Belgium"]
        })
        res.status(201).send("Yeah bby")
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = artistsDBRouter

