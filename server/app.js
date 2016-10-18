var express = require('express'),
  fs = require('fs'),
  _ = require('underscore'),
  Promise = require('bluebird'),
  request = require('request'),
  bodyParser = require('body-parser');
  var util = require('./util.js')
  // env = require('env'),
  // mysql = require('mysql');


var app = express();
var riotEndpts = {
  summonerID: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/',
  gameLog: 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/',
  apiKey: '?api_key=4a99a25b-dd7e-4698-8256-9b3b773fa3ed'
}

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

app.post('/champion',function(req,res) {
  console.log(req.body);
  
  res.end(JSON.stringify(util.baseCalculatorAllLvls(req.body.targetChamp)))
})
// request('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=spells,stats&api_key=4a99a25b-dd7e-4698-8256-9b3b773fa3ed').pipe(fs.createWriteStream('champdata.json'))
console.log('Server is listening on port 1337');
// var data = JSON.parse(fs.readFileSync('champdata.json','utf8'));
// // console.log(data.data['Jinx'].stats);
// console.log('armor calculator', util.lvlCalculator(5,'Maokai'));
// console.log('all the stats for jinx', util.baseCalculatorAllLvls('Nautilus'))
// console.log(data.data['Maokai'].stats);

app.listen(1337);