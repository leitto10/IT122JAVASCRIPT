const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');

const records = require('./models/quotes');

//Parsing the data
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
// set Access-Control-Allow-Origin header for api route
app.use('/api', require('cors')());

//Send a GET request to READ(view) a list of quotes
//http://localhost:3000/api/quotes/
app.get('/api/quotes', (req, res, next) => {
    return records.find({})
    .lean()
    .then((quotes) => {
        console.log(quotes);
        res.render('home_react', {quotes: JSON.stringify(quotes)});
    })
    .catch(err => next(err));
});

//Send a GET request to READ(view) a single quote
//http://localhost:3000/api/detail?id=
app.get('/api/detail', (req, res) => {
    //const quote = await records.getQuote(req.params.id);
    const itemId = req.query.id;
    return records.findOne({ _id: itemId })
    .lean()
    .then(quote => {
        console.log(quote);
        if(quote) {
            res.render('details', quote);
            //res.json(quote);
        }else{
            res.status(404).json({message: "Not a valid Quote id..."});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//Send a POST request to CREATE new Document.
//http://localhost:3000/api/quotes
app.post('/api/quotes', (req, res) => {
    console.log('Body', req.body);
    if(req.body.author && req.body.quote && req.body.date){
        const quote = new records({
            _id: new mongoose.Types.ObjectId(),
            quote: req.body.quote,
            author: req.body.author,
            date: req.body.date
        })
        quote.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "New Document Created...",
                createdDoc: quote
            });
        })
        .catch(err => console.log(err));
    }else{
        res.status(404).json({message: "Quote and author required."});
    }
});

//Delete a Quote from the database
//http://localhost:3000/api/delete/:id
app.get('/api/delete/:id', (req, res) => {
    const itemId = req.params.id;
    records.deleteOne({_id: itemId})
    .exec()
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Update a sigle record
//http://localhost:3000/api/quote?id=
app.get('/api/quote/:id', (req, res) => {
    const itemId = req.params.id;
    if(!itemId){
        return res.status(400).send("Missing URL parameter: quote id.");
    }
    records.findOneAndUpdate(
        {_id: itemId}, 
        {quote: req.params.quote, author: req.params.author, date: req.params.date} ,{new: true})
    .exec()
    .then(result => {
        console.log(result);
        res.json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Send a GET request to READ(view) a list of quotes
//http://localhost:3000/api/structuredata
app.get('/api/structuredata', (req, res, next) => {
    return records.find({})
    .lean()
    .then((quotes) => {
        console.log(quotes);
        res.json(quotes);
    })
    .catch(err => next(err));
});

//Send a GET request to READ(view) a single quote
//http://localhost:3000/api/structuredetail?id=
app.get('/api/structuredetail', (req, res) => {
    //const quote = await records.getQuote(req.params.id);
    const itemId = req.query.id;
    return records.findOne({ _id: itemId })
    .lean()
    .then(quote => {
        console.log(quote);
        if(quote) {
            //res.render('details', quote);
            res.json(quote);
        }else{
            res.status(404).json({message: "Not a valid Quote id..."});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//Error handlers middleware for staff that wen wrong with the 
//request or the server. 
app.use((req, res, next) => {
    const err = new Error("Wrong end point or request.");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
    next();
});

app.listen(3000, () => console.log('Quote API listening on port 3000!'));