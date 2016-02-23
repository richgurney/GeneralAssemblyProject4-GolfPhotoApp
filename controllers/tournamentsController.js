//crud actions
var Tournament = require("../models/tournament")
var User = require("../models/user");

function tournamentsIndex(req, res , next){
  Tournament.find({}, function(err, tournaments) {
    if (err) {
      console.log(err);
      return res.status(404).send(err);
    }
    res.status(200).send(tournaments);
  });
}

// function tournamentsCreate(req, res){
//   console.log(req)
//   var tournament = new Tournament(req.body.tournament);
//   tournament.save(function(err, newTournament){
//     if (err) return res.status(500).send(err);
//     var name = req.body.tournament.user;
//     User.findOne({ name: name }, function(err, user){
//       user.tournamnets.push(newTournament);
//       user.save(function(err, user) {
//         // We should really check for errors here
//         res.status(201).send(newTournament);
//       });
//     });
//   });
// }

function tournamentsCreate(request, response) {
  var tournament = new Tournament(request.body.tournament);

  tournament.save(function(error, tourn) {
    if(error) response.status(500).send(error);
    User.findOne({_id: request.body.userId}, function(err, user){
      if(err) console.log(err)
      user.tournaments.push(tourn._id)
      user.save()
    })

    response.status(201).send(tournament);
  });
}

function tournamentsShow(req, res){
  var id = req.params.id;

  Tournament.findById({ _id: id }, function(err, tournament) {
    if (err) return res.status(500).send(err);
    if (!tournament) return res.status(404).send(err);
    res.status(200).send(tournament);
  });
}

function tournamentsUpdate(req, res){
  var id = req.params.id;

  Tournament.findByIdAndUpdate({ _id: id }, req.body.tournament, function(err, tournament){
    if (err) return res.status(500).send(err);
    if (!tournament) return res.status(404).send(err);
    res.status(200).send(tournament);
  });
}

function tournamentsDelete(req, res){
  var id = req.params.id;

  Tournament.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(200).send();
  });
}

// function addImageToTourn(req, res){

// 	var id = req.params.id
// 	var image = req.body.image

// 	Tournamnet.findOne({ _id: id}, function(err, tourn){
// 		if(err) res.status(400).send(message: 'oops, something went wrong.')
// 		tourn.images.push(image.image)
// 		tourn.save()
// 		res.status(200).send()
// 	})
// }

module.exports = {
  tournamentsIndex:  tournamentsIndex,
  tournamentsCreate: tournamentsCreate,
  tournamentsShow:   tournamentsShow,
  tournamentsUpdate: tournamentsUpdate,
  tournamentsDelete: tournamentsDelete
  // addImageToTourn: addImageToTourn
};
