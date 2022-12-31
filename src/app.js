const path = require('node:path');
const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

const app = express();

// Paths setup
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const publicPath = path.join(__dirname, '../public');

// Handlebars engine and views setup
app.set('view engine', 'hbs');
app.set('views', templatesPath);
hbs.registerPartials(partialsPath);

// Set static directory

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});
app.get('/artists', (req, res) => {
    res.render('artists', {
        title: 'Artists'
    });
});
app.get('/news', (req, res) => {
    res.render('news', {
        title: 'News'
    });
});
app.get('/info', (req, res) => {
    res.render('info', {
        title: 'Info'
    });
});
app.get('/exhibitions', (req, res) => {
    res.render('exhibitions', {
        title: 'Exhibitions'
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404'
    });
});

app.listen(port, () => {
    console.log(`LISTENING on ${port}`);
});