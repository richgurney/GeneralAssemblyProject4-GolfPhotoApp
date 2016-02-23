var express = require('express');
var router = express.Router();
var Question = require('../models/tournament.js');

var usersController = require('../controllers/usersController.js');
var authenticationsController = require('../controllers/authenticationController.js');
var tournamentController = require('../controllers/tournamentsController')

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
	.get(usersController.usersIndex)
// 	.post(usersController.usersCreate)

// router.route('/users/:id') 
// 	.get(usersController.usersShow)
// 	.patch(usersController.usersUpdate)
// 	.delete(usersController.usersDelete)
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



//ROUTES FOR TOURNAMENT 
router.route('/projects')
  .get(tournamentController.tournamentsIndex)
  .post(tournamentController.tournamentsCreate)

router.route('/projects/:id') 
  .get(tournamentController.tournamentsShow)
  .patch(tournamentController.tournamentsUpdate)
  .delete(tournamentController.tournamentsDelete)
// router.route('/tournaments/newimage/:id')
// 	.post(tournamentController.addImageToTourn)

module.exports = router