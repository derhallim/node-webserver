const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

app.use((req,res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server-log.txt', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });


hbs.registerHelper('getCurrentYear', () => {
     return new Date().getFullYear() 
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
         pageTitle: 'Home page', 
        welcomeMessage: 'Welcome to our website'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page', 
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'Something went wrong'
    })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});