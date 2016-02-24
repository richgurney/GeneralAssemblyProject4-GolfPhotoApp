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
  

  function getCurrentUser(){

    if(CurrentUser.currentUser()){
      self.currentUser = CurrentUser.currentUser().local;
      console.log(self.currentUser)
    }
  }
  
  function getUsers() {
    User.query(function(data){
      
      self.all = data;
      // console.log(self.all[0].local.email)
      // console.log(self.currentUser)
    });
  }

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      self.getUsers();
      $state.go('loggedIn');

    }
    self.user = TokenService.decodeToken();
    CurrentUser.saveUser(self.user);
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
    self.user = CurrentUser.getUser();
    self.getUsers();
  }

  return self;
}
