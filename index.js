const http = require('http');
const port = 3000;
const fs = require('fs');

// Create an instance of the http server to handle HTTP requests
const server = http.createServer((req, res) => {

    // Set a response type of plain text for the response
    var url = req.url;
    if(url === '/'){
        res.writeHead(200, {'Content-Type': 'text/JavaScript'});
        // Send back a response and end the connection
        fs.readFile('data.js', (error, data) => {
            if(error){
                res.writeHead(404);
                res.write('Error, file not found...');
            }else{
                //res.write('Home Page.');
                res.write(data);
            }
            res.end();
        });
    }else if(url === '/about'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        // Send back a response and end the connection
        fs.readFile('index.html', (error, data) => {
            if(error){
                res.writeHead(404);
                res.write('Error, file not found...');
            }else{
                res.write(data);
            }
            res.end();
        });
    }else{
        console.log("Error, file not found...");
    }
});

// Start the server on port 3000
server.listen(port, (error) => {
    if(error){
        console.log('Something went wrong ', error);
    }else{
        console.log('Server is listening on port ', port);
    }
})