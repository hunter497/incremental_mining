// 'Levels' of the game, increase these every time the user prestiges. Precious metal mines that have higher value metals. Coal -> Iron -> Gold -> Diamond -> Adamantite -> Space Rock
var MINE_TYPES = [
    1,
    5,
    50,
    500,
    10000,
    1000000
]

// Pickaxe upgrades that allow the user to mine a larger quantity of precious metals. Basic -> Iron -> Adamantite -> Space Rock
var PICKAXE_UPGRADES = [
    1,
    2,
    4,
    8
]

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
            pickaxeLevel: PICKAXE_UPGRADES[0],
            mineType: MINE_TYPES[0],
            prestigeCost: 1000,
            prestigeLevel: 1,

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
    console.log(gameData.mineType);
    gameData.cash += gameData.cashPerClick * gameData.pickaxeLevel * gameData.mineType;
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
    gameData.cash += gameData.cashPerSecond * gameData.mineType;
    document.getElementById("cashMined").innerHTML = "$" + gameData.cash + " Mined";
}

function saveGame() {
    localStorage.setItem('minerSave', JSON.stringify(gameData));
}

function prestige() {
    if(gameData.cash >= gameData.prestigeCost) {
        gameData.cash = 0;
        gameData.cashPerClick = 1;
        gameData.cashPerClickCost = 10;
        gameData.autoMinerLevel = 1;
        gameData.autoMinerCost = 50;
        gameData.cashPerSecond = 0;
        gameData.pickaxeLevel = PICKAXE_UPGRADES[0];
        gameData.prestigeCost *= 10;
        gameData.mineType = MINE_TYPES[gameData.prestigeLevel];
        gameData.prestigeLevel = gameData.prestigeLevel + 1;
        document.getElementById("cashMined").innerHTML = "$" + gameData.cash + " Mined";
        document.getElementById("buyAutoMiner").innerHTML = "Buy auto miner (Currently Level " + gameData.autoMinerLevel + ") Cost: $" + gameData.autoMinerCost;
        document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently Level " + gameData.cashPerClick + ") Cost: $" + gameData.cashPerClickCost;
    }
    
}