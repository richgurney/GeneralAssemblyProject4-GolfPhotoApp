angular
  .module('golf-app')
  .controller('UploadController', UploadController);

UploadController.$inject = ["$scope",'Upload', 'Tournament', "$state", 'API'];

function UploadController($scope, Upload, Tournament, $state, API) {
  
  var self = this;

  self.title                  = 'Uploads';
  self.file                   = null;
  self.files                  = null;
  self.uploadedImages         = [];
  self.id                     = $state.params.id;
  self.currentUploadId        = [];
  self.holeNumber             = "";
  self.holeNotes              = "";
  self.url                    = "";

  self.currentTournament      = [];
  self.tournamentImages       = [];
  
  self.getCurrentTournament = function(){
    var one = Tournament.get({id: self.id}, function(){
      self.currentTournament = one;
      self.tournamentImages = self.currentTournament.images
    })
  }

  self.getCurrentTournament()

  self.bob = "bob";
  self.uploadSingle = function() {
    Upload.upload({
      url: API + '/upload/single',
      data: { file: self.file }
    }).then(function(res) {
      self.bob = "tim"
      //this is the response
      
      //this is the angular local picture
      // self.uploadedImages.push(res.data);
      // console.log(self.uploadedImages)
      //success console
      console.log("Success!");
      // current tournament id is accessible
      // console.log(self.id);
      // getting the url from response
      // console.log(res.data.filename)
      self.url = res.data.filename
      // console.log(self.url)

      // storing an image object in the tournament doc
      var newImage = {
        hole:   self.holeNumber, // add the right info
        notes:  self.holeNotes,
        url: self.url
      };

      Tournament.addImage({id: self.id, image: newImage}, function(res){
        console.log(res.image)
        image = res.image;
        self.tournamentImages.push(image);
        console.log(self.tournamentImages);
      });
    })
  }

  this.uploadMulti = function() {
    Upload.upload({
      url: APIs + '/upload/multi',
      arrayKey: '', // IMPORTANT: without this multer will not accept the files
      data: { files: self.files }
    })
    .then(function(res) {
      console.log("Success!");
      console.log(res);
    })
    .catch(function(err) {
      console.error(err);
    });
  }

  self.deleteImage = function(image){
    Tournament.deleteImage({id: self.id, image: image}, function(res){
      var index = self.tournamentImages.indexOf(image);
      self.tournamentImages.splice(index, 1)
    });
  
  };

}