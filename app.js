const express = require('express');
const { projects } = require('./data'); //serves data.json as an object//
const path = require('path'); //path module for setting absolute path in express.static function..
const _dirname = './views'
let indexRouter = require('./routes/index'); //imports the index route in routes/index.js//

const app = express();

//view engine setup//
//app.set('views', path.join(_dirname, 'views')); //folder with pug templates//
app.set('view engine', 'pug'); //sets view engine to pug//

//setup static middleware to serve static files in the public folder//
app.use('/static', express.static('public'));

app.use('/', indexRouter); //route to routes/index.js//

//404 error handler//
app.use((req, res, next) => {
    //creates a new error class object//
    const err = new Error()
    err.message = `It appears the page you requested does not exist.`;
    err.status = 404;

    //log out of the error code, stack to the console, with message//
    console.log('Error status code: ' + err.status);
    console.log(err.stack);

    //renders the 'page not found' template//
    res.status(404).render('page-not-found'); //displays a generic 404 page without error stack//
});

//global error handler//
app.use((err, req, next) => {
    if(err) {
        if(err.status === 404) {
            //console.log('404 error handler called');
            res.status(404).render('page-not-found', { err }); //renders the error status with the error stack//
        } else {
            err.message = err.message; //|| "Oops, it looks like something went wrong on the server...";//
            res.status(err.status || 500).render('error', { err }); //displays the error status and render the error template with error message//
        }
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000...');
});

module.exports = app; //exports the module as 'app'