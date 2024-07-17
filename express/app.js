// importing the express module
const express = require('express');

// seeting up middleware module
const morgan = require('morgan');


// setting up an express app
const app = express();

// importing file system module
const fs = require('fs');


// registering view engine to serve up dynamic data to html template
app.set('view engine', 'ejs')

// setting up the path module for easy routing
const path = require('path');
const { render } = require('ejs');

// listening for request
app.listen(3000)

// creating a custom middle to run just on the server
// app.use((req, res, next) => {
//     console.log('new req made')
//     console.log(req.path)
//     console.log(req.method);

//     next()
// })

// creating a third-party middleware
app.use(morgan('dev'));

// settinh up middleware for form submission
app.use(express.urlencoded({extended: true}))

// routing using express

// serve static files from a directory
app.use(express.static('public'));

// serve up dynamic files from a view directory
app.set('views', path.join(__dirname, '../views'));


app.get('/', (req, res) => {
    // res.send('<p>about home page</p>')
    // sending a static file to the browser
    // res.sendFile('index.html', {root:path.join(__dirname, '../pages')});


    // creating data to pass into ejs file
    const verses = JSON.parse(fs.readFileSync('./public/verses.json'));
    // sending dynamic file to the browser, we use the render() method
    res.render('index', {title: 'Home', verses}) 
});

app.get('/about', (req, res) => {
    // sending a file/response to the browser
    // res.sendFile('about.html', {root:path.join(__dirname, '../pages')});


    // sending dynamic file to the browser, we use the render() method
    res.render('about', {title: 'about'}) ;
}); 

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'create'})
})
// redirects using express
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// })

// response for a specific or selected data
app.get('/verse/:chapter', (req, res) => {
    const verses = JSON.parse(fs.readFileSync('./public/verses.json'))
    const verse = verses.find(verse => verse.chapter === (req.params.chapter));
    
    res.render('verse', {title: `${verse.chapter}:${verse.verse}`, verse})
    
})

// handling form submission----posting a request to the server
app.get('/verse/:chapter/edit', (req, res) => {
    const verses = JSON.parse(fs.readFileSync('./public/verses.json'))
    const verse = verses.find(verse => verse.chapter === req.params.chapter)
    res.render('edit', {title: 'Edit', verse})
});

app.post('/verse/:chapter/edit', (req, res) => {
    const verses = JSON.parse(fs.readFileSync('./public/verses.json'));

    // accessing and manipulating data of a selected item in a list
    const verseIndex = verses.findIndex(verse => verse.chapter === req.params.chapter);
    if(verseIndex !== -1){

        // console.log('Recieved form', req.body)

        verses[verseIndex].text = req.body.text
        
        // import file module to update changes made to the selected data
        const fs = require('fs');
        fs.writeFile('./public/verses.json', JSON.stringify(verses, null, 2), (err) =>{
            if(err){
                console.log('eeror writing to file',err)
                res.status(500).send('internal server error')
            }
            else{
                res.redirect(`/`);
            }
        })

    }
    else{
        res.status(404).redirect('404')
    }
})



// 404 page
app.use((req, res) => {
    res.status(404).sendFile('/404.html', {root: (path.join( __dirname, '../pages'))})

    // serving files using view engines
    res.status(404).render('404', {title: 'Error 404'})
})