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
        await Artist.updateOne({ lastname: "guțu" }, {
            captions: ["’’Mădălina’’, Vărăncău, 2021 \nanalog photography",
                "’’Going home’’, Râșcani, 2022\nanalog photography",
                "’’Valentina’’, Cobani, 2022\nanalog photography",
                "’’Sulina’s horses’’, Sulina, 2022\nanalog photography",
                "’’Farmer with his horse, Stârcea, 2023\nanalog photography",
                "’’Family portrait’’, Vărăncău, 2021\nanalog photography",
                "’’Comfort me’’, Hârtop, 2023\nanalog photography",
                "’’Portrait of the girl with shadow wing’’, Cociulia, 2023\nanalog photography",
                "’’Abandoned sport hall’’, Costești, 2021 \nanalog photography",
                "’’Kiril’’, Dumeni, 2021\nanalog photography",
                "’’Forest lady’’, Cociulia, 2023\nanalog photography",
                "’’Girl with broken arm’’, Horești, 2023\nanalog photography",
                "’’Lenin’s statue’’,  Zăicani, 2020\nanalog photography",
                "‘’Portrait of the girl from local holiday’’, Glodeni, 2022\nanalog photography",
                "’’Emil with his dog, Max’’, Dumeni, 2020\nanalog photography",
                "’’Portrait with accidental double exposure with a tree’’, Cobani, 2022\nanalog photography",
                "’’Fairies’’, Glodeni, 2022",
                "’’Anghelina’’, Naslavcea, 2023\nanalog photography",
                "’’Boys on water’’ ,Dumeni, 2021\nanalog photography",
                "’’Boy playing with rope around his head’’, Izvoare, 2019\nanalog photography"]
        })
        res.status(201).send("Yeah bby")
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = artistsDBRouter

