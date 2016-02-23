angular
  .module('golf-app')
  .controller('ProjectsController', ProjectsController);

ProjectsController.$inject = ["Project", "User", "$state", "CurrentUser"];
function ProjectsController(Project, User, $state, CurrentUser){
  var self = this;

  self.all      = [];
  self.users    = [];
  self.project  = {};

  self.getProjects = function(){
    Project.query(function(data){
      self.all = data;
    });
  };

  self.getUsers = function(){
    User.query(function(data){
       self.users = data;
    });
  };

  self.add = function(){
    var project = { project: self.project };
    console.log(project);
    Project.save(project, function(data){
      self.all.push(data);
      self.project = {};
      $state.go('projects');
    });
  };

  self.getProjects();
  self.getUsers();
}
