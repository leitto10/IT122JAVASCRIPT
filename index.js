const express = require('express');
const app = express();
//const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

//Parsing the data
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('DB Connected!'))
.catch(err => {
    console.log(err);
})

const records = require('./models/quotes');

//Send a GET request to READ(view) a list of quotes
app.get('/', (req, res, next) => {
    return records.find({})
    .lean()
    .then((quotes) => {
        console.log(quotes);
        res.render('home', {quotes});
        //res.status(200).json(quotes);
    })
    .catch(err => next(err));
});

//Send a GET request to READ(view) a single quote
//http://localhost:3000/detail?item
app.get('/detail', (req, res, next) => {
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
app.post('/quotes', (req, res) => {
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
app.delete('/quotes', (req, res) => {
    const itemId = req.query.id;
    records.remove({_id: itemId})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


app.listen(3000, () => console.log('Quote API listening on port 3000!'));