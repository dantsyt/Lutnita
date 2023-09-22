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

artistsRouter.get('/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const artist = await Artist.findById(_id)
        if (!artist) {
            return res.status(404).render('404', {
                title: '404 artists, not one found'
            })
        }
        res.send(artist) //render('artists_id')
    } catch (e) {
        res.status(400).send(e.message)
    }
})

module.exports = artistsRouter