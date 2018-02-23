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

// app.get('/',function (req, res) {
    /*User.find({}, function (err, docs) {
        res.render('user/list', {
            title: 'Customer List',
            users: docs
        });
    })*/
// });

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

/*app.post('/add', function (req, res) {

    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();

    var users = [];

    var errors = req.validationErrors();

    if(errors){
        res.render('user/add', {
            title: 'Add New User',
            users: users,
            errors: errors
        });
    } else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }

        User.create(newUser, function (err, result) {
            if(err){
                console.log(err);
            }
            res.redirect('/users');
        });
    }

});*/

app.use("/edit/:id",loaduser);

/*app.get('/edit/:id', function (req, res) {
    var o_id = req.params.id;
    User.findById({_id: o_id}, function (err, result) {
        if(err){
            console.log(err);
        }
        if(result){
            res.render('user/edit', {
                title: 'Edit Customer',
                id: result._id,
                first_name: result.first_name,
                last_name: result.last_name,
                email: result.email
            })
        }
    });
});*/

app.use("/edit/:id",loaduser);

/*app.post('/edit/:id', function (req, res) {

    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();

    var users = [];

    var errors = req.validationErrors();

    if(errors){
        res.render('user/edit', {
            title: 'Edit Customer',
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
        var o_id = req.params.id;
        User.findByIdAndUpdate({_id: o_id}, updateUser, function (err, result) {
            if(err){
                console.log(err);
            }
            res.redirect('/users');
        });
    }
});*/

app.use("/delete/:id",loaduser);

/*app.delete('/delete/:id', function (req, res) {
    User.remove({_id: req.params.id}, function (err, result) {
        if(err){
            console.log(err);
        }
        res.redirect('/users');
    });
});*/

module.exports = app;

