angular.module('golf-app', ['ui.router','ngResource'])
  .config(MainRouter)


function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', {
    url: "/",
    templateUrl: "/mainApp/states/home.html",
  })
  .state('register', {
    url: "/register",
    templateUrl: "/mainApp/states/register.html",
  }),


  $urlRouterProvider.otherwise('/');
}