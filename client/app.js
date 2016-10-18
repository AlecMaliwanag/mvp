var myApp = angular.module('league', ['ngRoute','league.navController']);
var flag = 0;
var allChamps = [];
myApp.config(function($routeProvider) {
  $routeProvider
    .when("/", {
    template:'/champStats.html',
    controller: 'champStatsController'
  })
})
.factory('globalData', function($http,$window) {
  var search = function(champion) {
    return $http({
      method: 'POST',
      url: '/champion',
      data: {targetChamp: champion},
      headers:{'Content-Type': 'application/json'} 
    }).then(function(response) {
      return { name: champion, baseStats: response.data };
    })
  };
  var searchSumTag = function(sumTag) {
    return $http({
      method: 'POST',
      url: '/name',
      data: {summonerTag: sumTag},
      headers:{'Content-Type': 'application/json'} 
    }).then(function(response) {
      return { history: response};
    })
  }
  return {search:search, searchSumTag: searchSumTag}
})
.controller('navController', function ($scope,$http,globalData) {
  $scope.targetChamp = [];
  $scope.search = function() {
    console.log('submit!')
    console.log($scope.searchChamp)
    if($scope.searchChamp) {
      globalData.search($scope.searchChamp).then(function(response) {
        $scope.targetChamp = response;
        window.targetChamp = response;
        console.log($scope.targetChamp);
        allChamps.push(response);
      })
      .then(function() {
        for (var key in $scope.targetChamp.baseStats[0]) {
          if(key !== "level" && key !== "movespeed") {
            console.log(key, typeof key);
            $scope.graph(key)
          }
        }
        // $scope.graph();
      });
    }
  },
  $scope.search2 = function() {
    if($scope.searchSummoner) {
      console.log('submit')
      globalData.searchSumTag($scope.searchSummoner)
        .then(function(response) {
          console.log(response.history);
        })
    }
  }
  $scope.graph = function(categoryValue) {
      console.log(graph)
      var graph = d3.select('#' + categoryValue),
        width = 250,
        height = 250,
        margins = {
          top: 20,
          right: 20,
          bottom: 20,
          left: 50
        };
      if(flag < 8)  {
        flag++; 
        xScale = d3.scale.linear().range([margins.left, width - margins.right]).domain([1, 18]),
        yScale = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([d3.min(window.targetChamp.baseStats, function (d) { return d[categoryValue] - d[categoryValue]*.1; }), d3.max(window.targetChamp.baseStats, function (d) { return d[categoryValue] + d[categoryValue]*.1; })]),
        xAxis = d3.svg.axis()
        .scale(xScale),
        yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
        graph.append("svg:g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (height - margins.bottom) + ")")
          .call(xAxis);

      graph.append("svg:g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + (margins.left) + ",0)")
          .call(yAxis);

      var lineGen = d3.svg.line()
          .x(function(d) {
              return xScale(d.level);
          })
          .y(function(d) {
              return yScale(d[categoryValue]);
          })
          .interpolate("basis");
      console.log(window.targetChamp);
      graph.append('svg:path')
          .attr('d', lineGen(window.targetChamp.baseStats))
          .attr('stroke', 'green')
          .attr('stroke-width', 2)
          .attr('fill', 'none');

      
    } else {
      var lineGen = d3.svg.line()
          .x(function(d) {
              return xScale(d.level);
          })
          .y(function(d) {
              return yScale(d[categoryValue]);
          })
          .interpolate("basis");
      graph.append('svg:path')
          .attr('d', lineGen(allChamps[allChamps.length-1].baseStats))
          .attr('stroke', 'blue')
          .attr('stroke-width', 2)
          .attr('fill', 'none');

    }

  }
});
