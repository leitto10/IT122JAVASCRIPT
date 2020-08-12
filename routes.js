const express = require('express');
const router = express();
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");

const records = require('./models/quotes');

//Parsing the data
router.use(bodyParser.json());
router.use(express.urlencoded({extended: false}));

router.engine('handlebars', exphbs());
router.set('view engine', 'handlebars');

//Send a GET request to READ(view) a list of quotes
router.get('/quotes', (req, res, next) => {
    return records.find({})
    .lean()
    .then((quotes) => {
        console.log(quotes);
        res.render('home_react', {quotes: JSON.stringify(quotes)});
    })
    .catch(err => next(err));
});

//Send a GET request to READ(view) a single quote
//http://localhost:3000/detail?item
router.get('/detail', (req, res) => {
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
router.post('/quotes', (req, res) => {
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
router.delete('/delete/:id', (req, res) => {
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
router.put('/quote', (req, res) => {
    const itemId = req.query.id;
    if(!itemId){
        return res.status(400).send("Missing URL parameter: quote id.");
    }
    records.findOneAndUpdate(
        {_id: itemId}, req.body, {new: true})
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
router.get('/structuredata', (req, res, next) => {
    return records.find({})
    .lean()
    .then((quotes) => {
        console.log(quotes);
        //res.render('home', {quotes});
        res.json(quotes);
    })
    .catch(err => next(err));
});

//Send a GET request to READ(view) a single quote
//http://localhost:3000/api/structuredetail?id=
router.get('/structuredetail', (req, res) => {
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

module.exports = router;