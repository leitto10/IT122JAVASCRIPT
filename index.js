const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
// set Access-Control-Allow-Origin header for api route
app.use('/api', routes);

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
});

app.listen(3000, () => console.log('Quote API listening on port 3000!'));