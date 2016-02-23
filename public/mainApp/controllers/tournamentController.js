angular
  .module('golf-app')
  .controller('TournamentsController', TournamentsController);

TournamentsController.$inject = ["Tournament", "User", "$state", "CurrentUser"];
function TournamentsController(Tournament, User, $state, CurrentUser){
  var self = this;

  self.all                    = [];
  self.users                  = [];
  self.tournament             = {};
  self.newTournament          = {};
  self.selected               = [];
  self.id                     = $state.params.id

  self.getOne = function(){
    var one = Tournament.get({id: self.id}, function(){
      self.selected = one;
    })
  }

  self.getTournaments = function(){
    Tournament.query(function(data){
      self.all = data;
    });
  };

  self.addTournament = function(){
      if (self.newTournament._id) {
        Tournament.update({tournament: self.newTournament, id: self.newTournament._id}, function(){
        self.newTournament = {};
      });
    } else {
      Tournament.save({tournament: self.newTournament, userId : CurrentUser.currentUser()._id}, function(data){
        self.all.push(data);
        self.newTournament = {};
      });
    }
  };

  self.deleteTournament = function(tournament){
    Tournament.delete({id: tournament._id});
    var index = self.all.indexOf(tournament);
    self.all.splice(index, 1)
  }

  // Fill the form to edit a Character
  this.editTournament = function(tournament){
    self.newTournament = tournament;
  }

  if (self.id) {
    self.getOne()
  }
  else {
    self.getTournaments()
  }

}


// 	self.addImageToTourn = function(){
// 		var newImage = {
// 			name: 'name' // add the right info
// 			url: 'url'
// 		}

// 		$http
// 			.post('localhost:3000/api/tournament/addimage/' + tournID, {image: newImage}, function(err, res){
// 				console.log(res)
// 			})
// 	}
  

// }