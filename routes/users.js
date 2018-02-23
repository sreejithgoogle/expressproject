var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var loaduser = require('../models/user');
/*var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
var ObjectId = mongojs.ObjectId;*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/customerapp');
var db = mongoose.connection;

/*db.once('open', function () {
    console.log('connected to MongoDB');
});

db.on('error', function (err) {
    console.log(err)
});*/

var User = require('../models/user');

var app = express();

/* function for list customers */

app.use("/",loaduser);

/* function for list customers */

/* function for add view page */

app.get('/add', function(req, res, next){
    // render to views/user/add.ejs
    res.render('user/add', {
        title: 'Add New Customer',
        name: '',
        age: '',
        email: ''
    })
});

/* function for add view page */

/* function for add customer */

app.use("/add",loaduser);

/* function for add customer */

/* function for edit view page */

app.use("/edit/:id",loaduser);

/* function for edit view page */

/* function for edit customer */

app.use("/edit/:id",loaduser);

/* function for edit customer */

/* function for delete customer */

app.use("/delete/:id",loaduser);

/* function for delete customer */

module.exports = app;

