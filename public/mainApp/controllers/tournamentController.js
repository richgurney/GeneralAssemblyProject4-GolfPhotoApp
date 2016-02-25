angular
  .module('golf-app')
  .controller('TournamentsController', TournamentsController);

TournamentsController.$inject = ["Tournament", "User", "$state", "CurrentUser", "$http"];
function TournamentsController(Tournament, User, $state, CurrentUser, $http){
  var self = this;

  self.all                    = [];
  self.users                  = [];
  self.tournament             = {};
  self.newTournament          = {};
  self.selected               = [];
  self.selectedImages         = [];
  self.id                     = $state.params.id;
  self.usersTournaments       = [];

  // get all the current users tournaments
  self.getUsersTournaments = function(){
    var userTourn = User.get({id: CurrentUser.currentUser()._id}, function(){
      self.usersTournaments = userTourn.tournaments;
      
    })
  }
  
  // gets the tournament that you clicked
  self.getOne = function(){
    var one = Tournament.get({id: self.id}, function(){
      self.selected = one;
      self.selectedImages = self.selected.images
    })
  }

  // this gets all the tournaments in the database
  self.getTournaments = function(){
    Tournament.query(function(data){
      self.usersTournaments = data;
    });
  };

  // add and update function for tournament
  self.addTournament = function(){
      if (self.newTournament._id) {
        Tournament.update({tournament: self.newTournament, id: self.newTournament._id}, function(){
        self.newTournament = {};
      });
    } else {
      Tournament.save({tournament: self.newTournament, userId : CurrentUser.currentUser()._id}, function(data){
        self.usersTournaments.push(data);
        self.newTournament = {};
      });
    }
  };

  // delete the clicked tournament
  self.deleteTournament = function(tournament){
    Tournament.delete({id: tournament._id});
    var index = self.all.indexOf(tournament);
    self.usersTournaments.splice(index, 1)
  }

  // Fill the form to edit a Character
  this.editTournament = function(tournament){
    self.newTournament = tournament;
  }

  // choosing between the to function that 
  // gets either the tournaments or just one 
  // if self.id is present
  if (self.id) {
    self.getOne()
  }
  else {
    self.getUsersTournaments()
    // self.getTournaments()
  }

//--------images for tournament------// 

// add an image to tournament
  self.addImageToTourn = function(){
    var newImage = {
      name: 'delete', // add the right info
      url: 'delete'
    };

    Tournament.addImage({id: self.id, image: newImage}, function(res){
      image = res.image;
      self.selectedImages.push(image);
      console.log(self.selectedImages);
    });
  };

  // delete the clicked tournament
  // self.deleteImage = function(image){
  //   Tournament.delete({id: tournament._id});
  //   var index = self.all.indexOf(tournament);
  //   self.usersTournaments.splice(index, 1)
  // }

  

  


};


	
  