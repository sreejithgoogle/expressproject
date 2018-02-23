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

app.use("/",loaduser);

app.get('/add', function(req, res, next){
    // render to views/user/add.ejs
    res.render('user/add', {
        title: 'Add New Customer',
        name: '',
        age: '',
        email: ''
    })
});

app.use("/add",loaduser);

app.use("/edit/:id",loaduser);

app.use("/edit/:id",loaduser);

app.use("/delete/:id",loaduser);

module.exports = app;

