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
      console.log(self.all)
    });
  };

  self.addTournament = function(){
    var tournament = { tournament: self.newTournament };
    Tournament.save(self.newTournament, function(data){

      self.all.push(data);
      self.newTournament = {};
      // $state.go('login');
    });
  };

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