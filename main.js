var gameData = {
    gold: 0,
    goldPerClick: 1,
    goldPerClickCost: 10,
    autoMinerLevel: 0,
    autoMinerCost: 50,
    goldPerSecond: 0,
}

function mineGold() {
    gameData.gold += gameData.goldPerClick;
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined";
}

function buyGoldPerClick() {
    if(gameData.gold >= gameData.goldPerClickCost) {
        gameData.gold -= gameData.goldPerClickCost;
        gameData.goldPerClick += 1;
        gameData.goldPerClickCost += 2;
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined";
        document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + " Gold";
    }
}

function buyAutoMiner() {
    if(gameData.gold >= gameData.autoMinerCost) {
        gameData.gold -= gameData.autoMinerCost;
        gameData.goldPerSecond += 1;
        gameData.autoMinerCost = Math.floor(gameData.autoMinerCost * 1.25);
        gameData.autoMinerLevel += 1;
        document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined";
        document.getElementById("buyAutoMiner").innerHTML = "Buy auto miner (Currently Level " + gameData.autoMinerLevel + ") Cost: " + gameData.autoMinerCost + " Gold";
    }
}

function generateGold() {
    gameData.gold += gameData.goldPerSecond;
    document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined";
}

function saveGame() {
    localStorage.setItem('goldMinerSave', JSON.stringify(gameData));
}

var mainGameLoop = window.setInterval(function() {
    generateGold();
}, 1000);

var saveGameLoop = window.setInterval(function() {
    saveGame();
}, 15000);

var savedGame = JSON.parse(localStorage.getItem("goldMinerSave"));
if (savedGame !== null) {
    gameData = savedGame;
}