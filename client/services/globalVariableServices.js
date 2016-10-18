angular.module('globalVariableServices',[])
.factory('globalData', function() {
  var gameHistory = {history:{data:null}};
  var targetChamp = {};
  return {
    getHist: function() {
      return gameHistory;
    },
    setHist: function(newData) {
      gameHistory = newData;
    },
    getTarg: function() {
      return targetChamp;
    },
    setTarg: function(newData) {
      targetChamp = newData;
    }
  }
});