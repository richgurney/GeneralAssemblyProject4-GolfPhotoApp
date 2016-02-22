var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TournamentSchema = new Schema({

	title: String,
	

});

module.exports = mongoose.model('Tournament', TournamentSchema);