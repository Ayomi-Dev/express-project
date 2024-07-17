const http = require('http'); //importing the http module;

const fs = require('fs');


// creating a server function which runs on the server i.e on the backend
const server = http.createServer( (req, res) => {
    

    // setting header for different type of responses
    // res.setHeader('Content-Type', 'text/plain') //for normal text;
    res.setHeader('Content-Type', 'text/html') //for html ;

    //determining paths or reading files dynamically based on url
    let path = './pages/'
    switch (req.url) {
        case('/') :
            path += 'index.html'
            res.statusCode = 200;
            break;
        
        case('/about'):
            path += 'about.html';
            res.statusCode = 200;
            break;

        //for redirects - redirecting a request to an existing resource
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html'
            res.statusCode = 404;
            break;
    }

    // reading a file to be sent as a response to client
    fs.readFile( path, (err, data) => { //setting path dynamically rather than writing path name
        if(err){
            console.log(err);
            res.end(); //so it does not leave request hanging if there is an eror
        }
        else{
            // res.write(data); //used if sending multiple data/files
            res.end(data); //if sending data only once, we can use the data directly in the end()
        }
    })
});



//listening for request on a server
// server.listen(3000, 'localhost', () => {
//     console.log('listening for request on port 3000 qith nodemon')
// })