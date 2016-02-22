var express = require('express');
var router = express.Router();

var usersController = require('../public/mainApp/controllers/usersController.js');
var authenticationsController = require('../public/mainApp/controllers/authenticationController.js');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.get('/', function(req,res){
	res.render('mainApp/index.ejs')
})

router.get('/register', function(req,res){
	res.render('mainApp/register.ejs')
})

module.exports = router