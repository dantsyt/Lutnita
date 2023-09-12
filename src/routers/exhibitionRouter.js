const express = require('express');
const exhibRouter = new express.Router();

const Exhibition = require('../models/exhibitionMod');

exhibRouter.use(express.json());

exhibRouter.get('/getExhibs', async (req, res) => {
    try {
        const exhib = await Exhibition.find({});
        res.send(exhib);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

exhibRouter.get('/getExhibs/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const exhibition = await Exhibition.findById(_id)
        if (!exhibition) { return res.status(404).send('404 exhibitions, not one found') }
        res.send(exhibition)
    } catch (e) {
        res.status(400).send(e.message);
    }
});

exhibRouter.post('/postExhib', async (req, res) => {
    const exhibition = new Exhibition(req.body);
    try {
        await exhibition.save();
        res.status(201).send(exhibition);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = exhibRouter