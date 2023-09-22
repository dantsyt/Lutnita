const express = require('express');
const path = require('node:path');
const exhibRouter = new express.Router();
const publicPath = path.join(__dirname, '../../public');

const Exhibition = require('../models/exhibitionMod');

exhibRouter.use(express.static(publicPath));

exhibRouter.get('/', (req, res) => {
    res.render('exhibitions', {
        title: 'Exhibitions'
    });
});

exhibRouter.get('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const exhibition = await Exhibition.findById({ _id });
        if (!exhibition) {
            return res.status(404).render('404', {
                title: '404 exhibitions, not one found...'
            });
        }
        res.render('exhibitions_id', {
            title: ""
        });
    } catch (e) {
        console.log(e.message);
    }

});

module.exports = exhibRouter