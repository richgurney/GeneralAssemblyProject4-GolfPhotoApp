var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TournamentSchema = new Schema({

	name: String,
	course: String,
	description: String,
	images: []
	

});

module.exports = mongoose.model('Tournament', TournamentSchema);



// var imageobj = {
// 	url: 'someURL.com',
// 	name: 'helloNiall'
// }


// Tournament.find(id, function(err, tournament){
// 	tournament.images.push(imageobj)
// 	tournament.save()
// })