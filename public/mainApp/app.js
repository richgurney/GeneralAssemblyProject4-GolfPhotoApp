angular
.module('golf-app', ['ngResource', 'angular-jwt', 'ui.router', 'ngFileUpload'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
  });

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', {
    url: "/",
    templateUrl: "/mainApp/states/home.html",
  })
  .state('register', {
    url: "/register",
    templateUrl: "/mainApp/states/register.html",
  }) 
  .state('login', {
    url: "/login",
    templateUrl: "/mainApp/states/login.html",
  })
  .state('profile', {
    url: "/profile",
    templateUrl: "/mainApp/states/profile.html",
  })
  .state('tournaments', {
    url: "/tournaments",
    templateUrl: "/mainApp/states/tournaments.html",
  })
  .state('showTournament', {
    url: "/showTournament/:id",
    templateUrl: "/mainApp/states/showTournament.html"
  })

 
  $urlRouterProvider.otherwise('/');
}