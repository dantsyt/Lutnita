const express = require('express');
const artistsRouter = new express.Router();

const Artist = require('../models/artistMod');

artistsRouter.use(express.json());

artistsRouter.get('/getArtists', async (req, res) => {
    try {
        const artist = await Artist.find({});
        res.send(artist);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

artistsRouter.get('/getOneArtist/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const artist = await Artist.findById(_id)
        if (!artist) { return res.status(404).send('404 artists, not one found') }
        res.send(artist)
    } catch (e) {
        res.status(400).send(e.message);
    }
});

artistsRouter.post('/postArtist', async (req, res) => {
    const artist = new Artist(req.body);
    try {
        await artist.save();
        res.status(201).send(artist);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = artistsRouter