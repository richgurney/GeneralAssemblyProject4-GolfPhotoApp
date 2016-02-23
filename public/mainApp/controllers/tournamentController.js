angular
  .module('golf-app')
  .controller('TournamentsController', TournamentsController);

TournamentsController.$inject = ["Tournament", "User", "$state", "CurrentUser"];
function TournamentsController(Tournament, User, $state, CurrentUser){
  var self = this;

  self.all      = [];
  self.users    = [];
  self.tournament  = {};
  self.newTournament = {};

  self.getTournaments = function(){
    Tournament.query(function(data){
      self.all = data;
      // console.log(self.all)
    });
  };

  self.addTournament = function(){
    console.log(CurrentUser.currentUser()._id)
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
  //   var tournament = { tournament: self.newTournament };
  //   Tournament.save(self.newTournament, function(data){
  //     self.all.push(data);
  //     self.newTournament = {};
  //     // $state.go('login');
  //   });
  // };

  self.deleteTournament = function(tournament){
    // console.log('its getting to delete')
    Tournament.delete({id: tournament._id});
    var index = self.all.indexOf(tournament);
    self.all.splice(index, 1)
  }

  // Fill the form to edit a Character
  this.editTournament = function(tournament){
    console.log("its getting to edit")
  
    self.newTournament = tournament;
    console.log(self.newTournament)
  }

  self.getTournaments();
  // self.getUsers();
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