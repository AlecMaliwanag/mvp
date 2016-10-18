angular.module('league.navController',[])
.controller('navController', function ($scope,$location,globalData,postFunctions,d3Graphing) {
  $scope.searchChampion = function() {
    console.log('submit!')
    if($scope.searchChamp) {
      postFunctions.search($scope.searchChamp)
      .then(function() {
        for (var key in globalData.getTarg().baseStats[0]) {
          if(key !== "level" && key !== "movespeed") {
            d3Graphing.graph(key)
          }
        }
      });
    }
  },
  $scope.searchSummonerName = function() {
    if($scope.searchSummoner) {
      console.log('submit')
      postFunctions.searchSumTag($scope.searchSummoner).then(function(response) {
        $location.path('/history')
      })
    }
  }
});

