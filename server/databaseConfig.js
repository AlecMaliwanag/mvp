var mongoose = require('mongoose');
mongoURI = 'mongodb://localhost/leagueApp';
mongoose.connect(mongoURI);
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open', function() {
  console.log('Mongodb connection open');
});
var gameSchema = mongoose.Schema({
  riotId: Number,
  summonerName: String,
  gameId: Number,
  champion: String,
  gameMode: String,
  win: Boolean,
  totalDamageDealtToChampions: Number,
  totalDamageTaken: Number,
  wardsPlaced: Number,
  wardsKilled: Number,
  playerRole: Number,
  assists:Number,
  deaths:Number,
  largestMultiKill:Number,
  kills: Number,
  largestKillingSpree: Number,
  timePlayed: String,
  iPEarned: Number,
  date: String
});

var Game = mongoose.model('Game', gameSchema);
exports.db = db;
exports.Game = Game;