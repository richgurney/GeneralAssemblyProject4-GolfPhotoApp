var express = require('express');
var router = express.Router();

var usersController = require('../controllers/usersController.js');
var authenticationsController = require('../controllers/authenticationController.js');


//render angular app
router.get('/', function(req,res){
	res.render('mainApp/index.ejs')
})





module.exports = router