angular
  .module('golf-app')
  .controller('UsersController', UsersController);

// Here we inject the currentUser service to access the current user
UsersController.$inject = ['User', 'TokenService', '$state', 'CurrentUser'];
function UsersController(User, TokenService, $state, CurrentUser){

  var self = this;
  self.all           = [];
  self.user          = {};
  self.error         = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;
  self.getCurrentUser= getCurrentUser;
  self.deleteUser    = deleteUser;
  self.editUser      = editUser;
  self.currentUser = {}


  function getCurrentUser(){
    if (self.currentUser == CurrentUser.currentUser()) {
      self.currentUser = CurrentUser.currentUser()
    };
  }

  function getUsers() {
    User.query(function(data){
      self.all = data;
    });
  }

  // delete the clicked tournament
   function deleteUser(user){
     User.delete({id: CurrentUser.currentUser()._id});
     TokenService.removeToken();
     self.all  = [];
     self.currentUser = {};
     CurrentUser.clearUser();
     $state.go('login');
   }

   // Fill the form to edit a user
   function editUser(){
     User.edit({user: self.currentUser, id: CurrentUser.currentUser()._id}, function(res) {
      CurrentUser.saveUser(res.user);
      self.currentUser = CurrentUser.user
     })
   }

   // fucntion to handle login 
  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      self.getUsers();
      $state.go('tournaments');
    }
    self.currentUser = CurrentUser.currentUser();
    CurrentUser.saveUser(self.user);
    self.currentUser = CurrentUser.currentUser();
  }

  function handleError(e) {
    self.error = "Something went wrong.";
  }

  function register() {
    self.error = null;
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    self.error = null;
    User.login(self.user, handleLogin, handleError);
  }

  function logout() {
    TokenService.removeToken();
    self.all  = [];
    self.user = {};
    CurrentUser.clearUser();
    $state.go('login');
  }

  function checkLoggedIn() {
    var loggedIn = !!TokenService.getToken();
    return loggedIn;
  }

  if (!!CurrentUser.getUser()) {
    self.getUsers();
  }

  return self;
}
