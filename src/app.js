const path = require('node:path')
const express = require('express')
const hbs = require('hbs')
const port = process.env.PORT || 3000

// DB and routers
require('./db/mongoose')
const artistsDBRouter = require('./routers/artistDBRouter')
const artistsRouter = require('./routers/artistRouter')
const exhibDBRouter = require('./routers/exhibitionDBRouter')
const exhibRouter = require('./routers/exhibitionRouter')
const newsDBRouter = require('./routers/newsDBRouter')
const newsRouter = require('./routers/newsRouter')

const app = express()

// Paths setup
const templatesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicPath = path.join(__dirname, '../public')
const sitemapPath = path.join(__dirname, '../sitemap.xml')

// Handlebars engine and views setup
app.set('view engine', 'hbs')
app.set('views', templatesPath)
hbs.registerPartials(partialsPath)

// HTTPs redirect

// app.use((req, res, next) => {
//     if (req.header('x-forwarded-proto') !== 'https')
//       res.redirect(`https://${req.header('host')}${req.url}`)
//     else
//       next()
//   })

// Set static directory and routers

app.use(express.static(publicPath))
app.use(artistsDBRouter)
app.use(exhibDBRouter)
app.use(newsDBRouter)

app.get('/', (req, res) => {
    res.render('upcoming', {
        title: 'Upcoming'
    })
})
app.use('/artists', artistsRouter)
app.use('/news', newsRouter)
app.get('/info', (req, res) => {
    res.render('info', {
        title: 'Info'
    })
})
app.use('/exhibitions', exhibRouter)
app.get('/team', (req, res) => {
    res.render('team', {
        title: 'team'
    })
})
app.get('/sitemap.xml', (req, res) => {
    res.sendFile(sitemapPath)
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404'
    })
})

app.listen(port, () => {
    console.log(`LISTENING on ${port}`)
})
