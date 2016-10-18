var myApp = angular.module('league', ['ngRoute','league.navController', 'league.matchHistoryController',
  'd3modeling','postServices']);
myApp.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl:'/views/statGraphs.html',
      controller: 'navController'
  })
    .when("/history", {
      templateUrl:'/views/matchHistory.html',
      controller: 'matchHistory'  
    })
});


