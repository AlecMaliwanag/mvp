var gameModel = require('./databaseConfig.js').Game;
var fs = require('fs');
var champData = require('./champDataById');

var dataCleaner = function(results, riotId,Summoner) {
  var data = [];
  for (var game in results) {
    var champion = champData.data[results[game].championId].name;
    var stats = results[game].stats;
    console.log(typeof results[game].gameId);
    var utcSeconds = results[game].createDate;
    var d = new Date(utcSeconds);
    
    data.push({
      riotId : riotId,
      summonerName : Summoner,
      gameId: results[game].gameId,
      champion: champion,
      gameMode: results[game].gameMode,
      win: stats.win,
      totalDamageDealtToChampions: stats.totalDamageDealtToChampions || 0,
      totalDamageTaken: stats.totalDamageTaken || 0,
      wardsPlaced: stats.wardPlaced || 0,
      wardsKilled: stats.wardKilled || 0,
      playerRole: stats.playerRole,
      assists: stats.assists || 0,
      deaths: stats.numDeaths || 0,
      largestMultiKill: stats.largestMultiKill || 0,
      kills:stats.championsKilled || 0,
      largestKillingSpree: stats.largestKillingSpree || 0,
      timePlayed: (stats.timePlayed / 60).toFixed(2),
      iPEarned: results[game].ipEarned,
      date: d.toLocaleString()
    });
  }
  console.log({gameId: data[data.length-1]['gameId'], 
                    summonerName: data[data.length-1]['summonerName'] });
  gameModel.find({gameId: data[data.length-1]['gameId'], 
                    summonerName: data[data.length-1]['summonerName'] })
    .then(function(results) {
      console.log(results,'results');
      if(results.length<1) {
        for (var i =0; i < data.length; i++) {
          var newDoc = new gameModel(data[i]).save(function(err) {
            // console.log(err);
          });
        }
      }
    })
  return data;
};

module.exports.dataCleaner = dataCleaner;