// 'Levels' of the game, increase these every time the user prestiges. Precious metal mines that have higher value metals.
var MINE_LEVELS_ENUM = {
    coal: 1,
    iron: 5,
    gold: 50,
    diamond: 500,
    admantite: 10000,
    space_rock: 1000000
}

// Pickaxe upgrades that allow the user to mine a larger quantity of precious metals.
var PICKAXE_UPGRADES_ENUM = {
    basic: 1,
    iron: 2,
    adamantite: 4,
    space_rock: 8
}

var gameData = {}

// Setup and runtime IFFEs, these can get complicated quickly.
(function() {
    var setupGame = function() {
        gameData = {
            cash: 1000,
            cashPerClick: 1,
            cashPerClickCost: 10,
            autoMinerLevel: 1,
            autoMinerCost: 50,
            cashPerSecond: 0,
            pickaxeLevel: PICKAXE_UPGRADES_ENUM.basic,
            mineLevel: MINE_LEVELS_ENUM.coal,
            prestigeCost: 1000,
        }
    };
    window.onload = setupGame();

    var mainGameLoop = window.setInterval(function() {
        generateCash();
    }, 1000);
    
    var saveGameLoop = window.setInterval(function() {
        saveGame();
    }, 15000);
    
    var savedGame = JSON.parse(localStorage.getItem("minerSave"));
    if (savedGame !== null) {
        gameData = savedGame;
    }
}());

//TODO: split out these to another file, these will get unwieldy quickly as features are added.
function mine() {
    gameData.cash += gameData.cashPerClick * gameData.pickaxeLevel;
    document.getElementById("cashMined").innerHTML = "$" + gameData.cash + " Mined";
}

function buyPerClickUpgrade() {
    if(gameData.cash >= gameData.cashPerClickCost) {
        gameData.cash -= gameData.cashPerClickCost;
        gameData.cashPerClick += 1;
        gameData.cashPerClickCost += 2;
        document.getElementById("cashMined").innerHTML = "$" + gameData.cash + " Mined";
        document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.cashPerClick + ") Cost: $" + gameData.cashPerClickCost;
    }
}

function buyAutoMiner() {
    if(gameData.cash >= gameData.autoMinerCost) {
        gameData.cash -= gameData.autoMinerCost;
        gameData.cashPerSecond += 1;
        gameData.autoMinerCost = Math.floor(gameData.autoMinerCost * 1.25);
        gameData.autoMinerLevel += 1;
        document.getElementById("cashMined").innerHTML = "$" + gameData.cash + " Mined";
        document.getElementById("buyAutoMiner").innerHTML = "Buy auto miner (Currently Level " + gameData.autoMinerLevel + ") Cost: $" + gameData.autoMinerCost;
    }
}

function generateCash() {
    gameData.cash += gameData.cashPerSecond;
    document.getElementById("cashMined").innerHTML = "$" + gameData.cash + " Mined";
}

function saveGame() {
    localStorage.setItem('minerSave', JSON.stringify(gameData));
}

function prestige() {
    if(gameData.cash >= gameData.prestigeCost) {
        gameData = {
            cash: 1000,
            cashPerClick: 1,
            cashPerClickCost: 10,
            autoMinerLevel: 1,
            autoMinerCost: 50,
            cashPerSecond: 0,
            pickaxeLevel: PICKAXE_UPGRADES_ENUM.basic,
            mineLevel: MINE_LEVELS_ENUM.iron,
            prestigeCost: 1000,
        }
        console.log(gameData);
    }
}