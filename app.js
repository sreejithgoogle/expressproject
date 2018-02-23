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

 /*app.post('/users/add', function (req, res) {

    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();

    var users = [];

    var errors = req.validationErrors();

    if(errors){
        res.render('index', {
            title: 'Customers',
            users: users,
            errors: errors
        });
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }

        db.users.insert(newUser, function (err, result) {
            if(err){
                console.log(err);
            }
            res.redirect('/');
        });
    }

});

app.get('/edit/:id', function (req, res) {
    var o_id = new ObjectId(req.params.id)
    db.users.findOne({_id: o_id}, function (err, result) {
        if(err){
            console.log(err);
        }
        if(result){
            res.render('edit', {
                title: 'Customers',
                id: result._id,
                first_name: result.first_name,
                last_name: result.last_name,
                email: result.email
            })
        }
    });
});

app.post('/users/edit/:id', function (req, res) {

    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();

    var users = [];

    var errors = req.validationErrors();

    if(errors){
        res.render('edit', {
            title: 'Customers',
            id: req.params.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            users: users,
            errors: errors
        });
    } else {
        var updateUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        var o_id = new ObjectId(req.params.id)
        db.users.update({_id: o_id}, updateUser, function (err, result) {
            if(err){
                console.log(err);
            }
            res.redirect('/');
        });
    }
});

app.delete('/users/delete/:id', function (req, res) {
    db.users.remove({_id: ObjectId(req.params.id)}, function (err, result) {
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });
});*/

app.use('/users', users);

app.listen(3000, function () {
    console.log('Server Started on port 3000....');
})