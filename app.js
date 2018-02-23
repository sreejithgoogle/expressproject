var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/customerapp');
var db = mongoose.connection;
/*var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
var ObjectId = mongojs.ObjectId;*/

/*db.once('open', function () {
    console.log('connected to MongoDB');
});

db.on('error', function (err) {
    console.log(err)
});*/

var User = require('./models/user');

var app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
 * import routes/users.js
 */
var users = require('./routes/users')

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Get Static Path
app.use(express.static(path.join(__dirname, 'public')))

// Global Vars

app.use(function (req, res, next) {
    res.locals.errors = null;
    next();
});

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        }
    }
}));

app.get('/', function (req, res) {

        res.render('index', {
            title: 'Welcome To Customer Managment APP'
        });
});

app.use('/users', users);

app.listen(3000, function () {
    console.log('Server Started on port 3000....');
})