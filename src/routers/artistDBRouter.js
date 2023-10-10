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

artistsDBRouter.get('/getOneArtist/:fullname', async (req, res) => {
    const fullname = req.params.fullname
    console.log(req.params.fullname)
    try {
        const artist = await Artist.findOne({ fullname })
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
        await Artist.updateOne({ lastname: "șarpe" }, {
            firstname: "mihail"
        })
        res.status(201).send("Yeah bby")
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = artistsDBRouter

