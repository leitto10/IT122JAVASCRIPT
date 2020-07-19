const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const records = require('./data');

//Send a GET request to READ(view) a list of quotes
app.get('/', (req, res) => {
    const quotes = records.getAll();
    //res.json(quotes);
    res.render('home', { quotes: quotes});
})

//Send a GET request to READ(view) a single quote
//http://localhost:3000/detail?item
app.get('/detail', (req, res) => {
    //const quote = await records.getQuote(req.params.id);
    const quote = records.getQuote(req.query.id);
    //res.json(quote);
    res.render('details', quote);
})

app.listen(3000, () => console.log('Quote API listening on port 3000!'));