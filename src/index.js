const express = require('express');
require('./db/mongoose');
const Artist = require('./models/artist');
const Exhibition = require('./models/exhibition');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/artists', async (req, res) => {
    const artist = new Artist(req.body);

    try {
        await artist.save();
        res.status(201).send(artist);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.post('/exhibitions', async (req, res) => {
    const exhibition = new Exhibition(req.body);

    try {
        await exhibition.save();
        res.status(201).send(exhibition);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/getArtists', async (req, res) => {
    try {
        const artist = await Artist.find({});
        res.send(artist);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.get('/getArtists/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const artist = await Artist.findById(_id)
        if (!artist) { return res.status(404).send('404 artists, not one found') }
        res.send(artist)
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/exhibitions', async (req, res) => {
    try {
        const exhibition = await Exhibition.find({});
        res.send(exhibition);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

app.get('/exhibitions/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const exhibition = await Exhibition.findById(_id)
        if (!exhibition) { return res.status(404).send('404 exhibitions, not one found') }
        res.send(exhibition)
    } catch (e) {
        res.status(400).send(e.message);
    }
})

app.listen(port, () => {
    console.log('Server up un port ' + port);
});