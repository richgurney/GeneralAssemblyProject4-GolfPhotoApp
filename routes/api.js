var express = require('express');
var router = express.Router();
var Question = require('../models/tournament.js');

var usersController = require('../controllers/usersController.js');
var authenticationsController = require('../controllers/authenticationController.js');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
  .get(usersController.usersIndex)
  // .post(usersController.usersCreate)
// ***************SHOW ALL***************
// router.get('/tournaments', function(req,res){

// });

// router.get('/register', function(req,res){
// 	res.render('mainApp/register.ejs')
// })

// router.get('/logged', function(req,res){
// 	res.render('mainApp/register.ejs')
// })

module.exports = router