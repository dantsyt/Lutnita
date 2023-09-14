const express = require('express');
const exhibDBRouter = new express.Router();

const Exhibition = require('../models/exhibitionMod');

exhibDBRouter.use(express.json());

exhibDBRouter.get('/getExhibs', async (req, res) => {
    try {
        const exhib = await Exhibition.find({});
        res.send(exhib);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

exhibDBRouter.get('/getOneExhib/:exhibname', async (req, res) => {
    const exhibname = req.params.exhibname;
    try {
        const exhibition = await Exhibition.findOne({ exhibname: exhibname });
        if (!exhibition) { return res.status(404).send('404 exhibitions, not one found') }
        res.send(exhibition)
    } catch (e) {
        res.status(400).send(e.message);
    }
});

exhibDBRouter.post('/postExhib', async (req, res) => {
    const exhibition = new Exhibition(req.body);
    try {
        await exhibition.save();
        res.status(201).send(exhibition);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = exhibDBRouter