var express = require('express');
var router = express.Router();

var usersController = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationController');
var tournamentController = require('../controllers/tournamentsController');
var uploadController = require('../controllers/uploadController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
	.get(usersController.usersIndex);

router.route('/users/:id')
	.get(usersController.usersShow)
	.put(usersController.usersUpdate)
	.delete(usersController.usersDelete);

router.route('/tournaments')
  .get(tournamentController.tournamentsIndex)
  .post(tournamentController.tournamentsCreate);

router.route('/addimage/:id')
	.post(tournamentController.addImage);

router.route('/deleteImage/:id')
	.put(tournamentController.deleteImage);

router.route('/tournaments/:id') 
  .get(tournamentController.tournamentsShow)
  .patch(tournamentController.tournamentsUpdate)
  .delete(tournamentController.tournamentsDelete);
  
module.exports = router