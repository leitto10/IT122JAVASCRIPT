const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");

//app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const records = require('./data');

//Send a GET request to READ(view) a list of quotes
app.get('/', (req, res) => {
    const quotes = records.getAll();
    //res.json(quotes);
    res.render('home', { quotes: quotes});
});

//Send a GET request to READ(view) a single quote
//http://localhost:3000/detail?item
app.get('/detail', (req, res) => {
    //const quote = await records.getQuote(req.params.id);
    const quote = records.getQuote(req.query.id);
    //res.json(quote);
    res.render('details', quote);
});

// app.post('/quotes', (req, res) => {
//     if(req.body.author && req.body.quote && req.body.date){
//         const quote = records.addItemQuote({
//             quote: req.body.quote,
//             author: req.body.author,
//             date: req.body.date
//         });
//         console.log(quote);
//         res.status(201).json(quote);
//     }else{
//         res.status(404).json({message: "Quote and author required."});

//     }
// });

app.listen(3000, () => console.log('Quote API listening on port 3000!'));