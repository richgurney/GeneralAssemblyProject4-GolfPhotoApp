angular
  .module('golf-app')
  .controller('UploadController', UploadController);

UploadController.$inject = ['Upload', 'API'];

function UploadController(Upload, API) {
  var self = this;

  self.title = 'Uploads';
  self.file = null;
  self.files = null;
  self.uploadedImages = [];
  
  self.uploadSingle = function() {
    Upload.upload({
      url: API + '/upload/single',
      data: { file: self.file }
    })
    .then(function(res) {
      console.log('here')
      console.log("Success!");
      self.uploadedImages.push(res.data);
      console.log(self.uploadedImages)



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