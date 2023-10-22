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
        await Artist.updateOne({ fullname: "dianacepleanu" }, {
            captions: ["ANCUȚA\noil on paper,  2018\n29 x 41 cm",
                "ANCUȚA WITH BEADED NECKLACE\noil on paper,  2018\n29 x 41 cm",
                "PEPINE\noil on paper,  2017\n25 X 25 cm",
                "PEPINE\noil on paper,  2017\n17 X 25 cm",
                "SELF-PORTRAIT\noil on cardboard, 2016\n76 x 40 cm",
                "SELF-PORTRAIT\noil on cardboard, 2013\n70 x 100 cm",
                "SELF-PORTRAIT\noil on canvas, 2016\n65 x 55 cm",
                "SELF-PORTRAIT\noil on canvas, 2023\n33 x 41 cm",
                "UNTITLED\noil on cardboard, 2003\n25 x 20 cm",
                "UNTITLED\noil on cardboard, 2003\n25 x 15 cm",
                "PORTRAIT\ntempera and green pen on paper, 2003\n21 x 20 cm",
                "TWO\noil on paper, 2003\n30 x 40 cm",
                "J. H.\noil on paper, 2018\n21 x 28 cm",
                "KRISTINA\noil on cardboard, 2017\n27 x 24 cm",
                "KRISTINA\noil on paper,  2017\n18 x 20 cm",
                "IORGU\noil on canvas, 2016\n33 x 34 cm",
                "IORGU (front)\noil on canvas, 2016\n33 x 34 cm",
                "IORGU  (back)\noil on canvas, 2016\n30 x 33 cm",
                "SELF-PORTRAIT\noil on canvas, 2013\n30 x 40 cm"
            ]
        })
        res.status(201).send("Yeah bby")
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = artistsDBRouter

