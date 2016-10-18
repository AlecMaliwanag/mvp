var express = require('express'),
  fs = require('fs'),
  Promise = require('bluebird'),
  request = require('request'),
  bodyParser = require('body-parser'),
  statUtil = require('./statUtilities.js'),
  gameLogUtil = require('./gameHistoryUtilities.js'),
  db = require('./databaseConfig.js').db;

//================ app variables ===================================================
var riotEndpts = {
  summonerID: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/',
  gameLog: 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/',
  apiKey: '?api_key=4a99a25b-dd7e-4698-8256-9b3b773fa3ed'
}
var app = express();

//================================================================================
  // Middleware
//================================================================================
app.use(express.static( __dirname + '/../client'));
app.use(bodyParser.json());

//================================================================================
  // Routing
//================================================================================
//data pulls
app.get('/*',function(req,res) {
  
});
//post requests
app.post('/champion',function(req,res) {
  res.end(JSON.stringify(statUtil.baseCalculatorAllLvls(req.body.targetChamp)))
})

app.post('/name', function(req, response) {
  console.log('receive Post request')
  var summoner = req.body.summonerTag;
  console.log(req.body);
  var riotId;
  var recentGameData;

  //request to get summoner id from summoner name
  request.get(riotEndpts.summonerID + summoner + riotEndpts.apiKey, function(err, req, res) {
    riotId = JSON.parse(res)[summoner]['id'];
    if(JSON.parse(res)[summoner]) {
      //request to get summoner games from summoner id
      request.get(riotEndpts.gameLog + riotId + '/recent' + riotEndpts.apiKey, function(err, req, res) {
        recentGameData = gameLogUtil.dataCleaner(JSON.parse(res).games, riotId, summoner);
        response.writeHead(201);
        response.end(JSON.stringify(recentGameData));
      })
    }
  });
})

console.log('Server is listening on port 1337');

app.listen(1337);