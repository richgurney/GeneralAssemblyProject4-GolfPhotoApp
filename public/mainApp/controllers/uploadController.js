angular
  .module('golf-app')
  .controller('UploadController', UploadController);

UploadController.$inject = ['Upload', 'Tournament', "$state", 'API'];

function UploadController(Upload, Tournament, $state, API) {
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
  
  self.uploadSingle = function() {
    Upload.upload({
      url: API + '/upload/single',
      data: { file: self.file }
    })
    .then(function(res) {
      //this is the response
      // console.log(res);
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
      // console.log(newImage);

      Tournament.addImage({id: self.id, image: newImage}, function(res){
        console.log(res.image)
        image = res.image;
        self.selectedImages.push(image);
        console.log(self.selectedImages);
      });
      
      
      
 //-------------------------------------------------//    
 // add an image to tournament
   // self.addImageToTourn = function(){
   //   var newImage = {
   //     name: 'delete', // add the right info
   //     url: 'delete'
   //   };

   //   Tournament.addImage({id: self.id, image: newImage}, function(res){
   //     image = res.image;
   //     self.selectedImages.push(image);
   //     console.log(self.selectedImages);
   //   });
   // };

 //-----------------------------------------------//  
    })
    .catch(function(err) {
      console.error(err);
    });
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
}