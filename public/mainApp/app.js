angular.module('golf-app', ['ui.router','ngResource'])
  .config(MainRouter)


function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', {
    url: "/",
    templateUrl: "/mainApp/states/home.html",
  })


  $urlRouterProvider.otherwise('/');
}