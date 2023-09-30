const express = require('express')
const path = require('node:path')
const artistsRouter = new express.Router()
const publicPath = path.join(__dirname, '../../public')

const Artist = require('../models/artistMod')

artistsRouter.use(express.static(publicPath))

artistsRouter.get('/', async (req, res) => {
    res.render('artists', {
        title: 'Artists'
    })
})

artistsRouter.get('/:lastname', async (req, res) => {
    const lastname = req.params.lastname
    try {
        const artist = await Artist.findOne({ lastname })
        if (!artist) {
            return res.status(404).render('404', {
                title: '404 artists, not one found'
            })
        }
        res.render('artists_id')
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = artistsRouter