var express = require('express');
var router = express.Router();

var usersController = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationController');
var tournamentController = require('../controllers/tournamentsController')

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
	.get(usersController.usersIndex);

router.route('/tournaments')
  .get(tournamentController.tournamentsIndex)
  .post(tournamentController.tournamentsCreate);

router.route('/tournaments/:id') 
  .get(tournamentController.tournamentsShow)
  .patch(tournamentController.tournamentsUpdate)
  .delete(tournamentController.tournamentsDelete);
// router.route('/tournaments/newimage/:id')
// 	.post(tournamentController.addImageToTourn)

module.exports = router