angular.module('league.matchHistoryController',[])
.controller('matchHistory',function($scope,globalData) {
  $scope.games = globalData.getHist().history.data;
});