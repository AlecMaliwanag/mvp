var fs = require('fs');
var data = JSON.parse(fs.readFileSync('champdata.json','utf8')); 
module.exports = {
  lvlCalculator : function(level, champion) {
    var targetChampion = data.data[champion].stats;
    //Statistic= b+g×(n−1)×(0.685+0.0175×n)  b = base g = growth statistic n = champion level
    var baseStats = {
      level: level,
      currentArmor: targetChampion['armor'] + targetChampion['armorperlevel'] * (level -1) * (.685 + 0.0175*level),
      currentAttackDamage : targetChampion['attackdamage'] + targetChampion['attackdamageperlevel'] * (level -1) * (.685 + 0.0175*level),
      currentAttackSpeed : (.625/(1+ targetChampion['attackspeedoffset'])) + (targetChampion['attackspeedperlevel'] * (level -1) * (.685 + 0.0175*level)/100),
      currentHp : targetChampion['hp'] + targetChampion['hpperlevel'] * (level -1) * (.685 + 0.0175*level),
      currentHpRegen : targetChampion['hpregen'] + targetChampion['hpregenperlevel'] * (level -1) * (.685 + 0.0175*level),
      movespeed : targetChampion['movespeed'],
      currentMana : targetChampion['mp'] + targetChampion['mpperlevel'] * (level -1) * (.685 + 0.0175*level),
      currentMpRegen : targetChampion['mpregen'] + targetChampion['mpregenperlevel'] * (level -1) * (.685 + 0.0175*level),
      currentSpellBlock : targetChampion['spellblock'] + targetChampion['spellblockperlevel'] * (level -1) * (.685 + 0.0175*level)
    }
    return baseStats;
  },
  baseCalculatorAllLvls : function(champion) {
    var storage = [];
    for (var i = 1; i <19; i++) {
      storage.push(this.lvlCalculator(i,champion))
    }
    return storage;
  }
}