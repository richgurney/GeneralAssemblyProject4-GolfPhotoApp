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
  console.log("hitting controller")

  function getCurrentUser(){

    // if(CurrentUser.currentUser()){
    //   self.currentUser = CurrentUser.currentUser();
    //   // console.log(self.currentUser)
    // }
    console.log("hitting getCurrentUser function")
    if (self.currentUser == CurrentUser.currentUser()) {
      self.currentUser = CurrentUser.currentUser()
    };
  }

  function getUsers() {
    User.query(function(data){
      console.log(data)
      self.all = data;
      // console.log(self.all[0].local.email)
      // console.log(self.currentUser)
    });
  }

  // ----------------- update and delete user
  // delete the clicked tournament
   function deleteUser(user){
     User.delete({id: CurrentUser.currentUser()._id});
     
     TokenService.removeToken();
     self.all  = [];
     self.currentUser = {};
     CurrentUser.clearUser();
     $state.go('login');
   }

   // Fill the form to edit a Character
   function editUser(){
    console.log(self.currentUser)
      // console.log(CurrentUser.currentUser()._id)
     User.edit({user: self.currentUser, id: CurrentUser.currentUser()._id}, function(res) {
      console.log(res)
      CurrentUser.saveUser(res.user);
      // getCurrentUser();
      self.currentUser = CurrentUser.user
      console.log(self.currentUser);
     })
     // self.newTournament = user;
   }

  //-----------------------------------------------

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      self.getUsers();
      $state.go('tournaments');
    }
    // getCurrentUser();
    // self.user = CurrentUser.currentUser();
    self.currentUser = CurrentUser.currentUser();
    // self.user = TokenService.decodeToken();
    CurrentUser.saveUser(self.user);
    // self.user = CurrentUser.user;
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
    // self.user = {};
    CurrentUser.clearUser();
    $state.go('login');
  }

  function checkLoggedIn() {
    var loggedIn = !!TokenService.getToken();
    return loggedIn;
  }

  if (!!CurrentUser.getUser()) {
    // self.user = CurrentUser.getUser();
    self.getUsers();
  }

  return self;
}
