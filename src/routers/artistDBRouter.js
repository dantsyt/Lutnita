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
        await Artist.updateMany({}, {
            imgpathmob: ["1_450px.webp",
                "2_450px.webp",
                "3_450px.webp",
                "4_450px.webp",
                "5_450px.webp",
                "6_450px.webp",
                "7_450px.webp",
                "8_450px.webp",
                "9_450px.webp",
                "10_450px.webp",
                "11_450px.webp",
                "12_450px.webp",
                "13_450px.webp",
                "14_450px.webp",
                "15_450px.webp",
                "16_450px.webp",
                "17_450px.webp",
                "18_450px.webp",
                "19_450px.webp",
                "20_450px.webp"]
        })
        res.status(201).send("Yeah bby")
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = artistsDBRouter

