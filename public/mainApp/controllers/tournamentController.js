angular
  .module('golf-app')
  .controller('tournamentController', TournamentController);

TournamentController.$inject = ['$scope', '$http']

// function TournamentController($scope, $http){

// 	var self = this;
// 	self.name = "name"













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