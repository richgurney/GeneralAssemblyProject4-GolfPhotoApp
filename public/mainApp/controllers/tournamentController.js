angular
  .module('golf-app')
  .controller('tournamentController', TournamentController);

TournamentController.$inject = ['$scope', '$http']

function TournamentController($scope, $http){

	var self = this;
	self.name = "name"
  

}