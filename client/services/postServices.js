angular.module('postServices', ['globalVariableServices'])
.factory('postFunctions', function($http,$window, globalData) {
  var search = function(champion) {
    return $http({
      method: 'POST',
      url: '/champion',
      data: {targetChamp: champion},
      headers:{'Content-Type': 'application/json'} 
    }).then(function(response) {
      globalData.setTarg({name: champion, baseStats: response.data});
      // return { name: champion, baseStats: response.data };
    })
  };
  var searchSumTag = function(sumTag) {
    return $http({
      method: 'POST',
      url: '/name',
      data: {summonerTag: sumTag},
      headers:{'Content-Type': 'application/json'} 
    }).then(function(response) {
      globalData.setHist({history: response})
      return response;
    })
  }
  return {search:search, searchSumTag: searchSumTag};
});