
var express = require('express');
var router = express.Router();

//export this router to use in our index.js


var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    first_name:{
        type: String, required: true
    },
    last_name:{
        type: String, required: true
    },
    email:{
        type: String, required: true
    }
});

var User = module.exports = mongoose.model('User', userSchema);

/* function for list customers */

router.get('/',function (req, res) {
    User.find({}, function (err, docs) {
     res.render('user/list', {
     title: 'Customer List',
     users: docs
     });
     })
});

/* function for list customers */

/* function for add customer */

router.post('/add', function (req, res) {

    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').notEmpty();

    var users = [];

    var errors = req.validationErrors();

    if(errors){
        res.render('user/add', {
            title: 'Add New Customer',
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

});

/* function for add customer */

/* function for edit view page */

router.get('/edit/:id', function (req, res) {
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
});

/* function for edit view page */

/* function for edit customer */

router.post('/edit/:id', function (req, res) {

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
});

/* function for edit customer */

/* function for delete customer */

router.delete('/delete/:id', function (req, res) {
    User.remove({_id: req.params.id}, function (err, result) {
        if(err){
            console.log(err);
        }
        res.redirect('/users');
    });
});

/* function for delete customer */

module.exports = router;