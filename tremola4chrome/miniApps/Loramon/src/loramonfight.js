let playerLoramon = null;
let enemyLoramon = null;
let battleInterval = null;
const LORAMON_DATA = {
    appko: {
        name: "AppKo",
        hp: 100,
        maxhp: 100,
        element: "plant",
        attackPower: 20,
        id: 1,
        sprite: "../miniApps/Loramon/assets/appko.png",
        back: "../miniApps/Loramon/assets/appkoback.png"
        
    },
    bluebert: {
        name: "Bluebert",
        hp: 100,
        maxhp: 100,
        element: "water",
        attackPower: 25,
        id: 2,
        sprite: "../miniApps/Loramon/assets/bluebert.png",
        back: "../miniApps/Loramon/assets/bluebertback.png"
    },
    chillguy: {
        name: "ChillGuy",
        hp: 100,
        maxhp: 100,
        element: "water",
        attackPower: 15,
        id: 3,
        sprite: "../miniApps/Loramon/assets/chillguy.png",
        back: "../miniApps/Loramon/assets/chillguyback.png"
    },
    eggvance: {
        name: "EggVance",
        hp: 100,
        maxhp: 100,
        element: "fire",
        attackPower: 15,
        id: 4,
        sprite: "../miniApps/Loramon/assets/eggvance.png",
        back: "../miniApps/Loramon/assets/eggvanceback.png"
    },
    lophin: {
        name: "Lophin",
        hp: 100,
        maxhp: 100,
        element: "water",
        attackPower: 15,
        id: 5,
        sprite: "../miniApps/Loramon/assets/lophin.png",
        back: "../miniApps/Loramon/assets/lophinback.png"
    },
    mysticaltree: {
        name: "MysticalTree",
        hp: 100,
        maxhp: 100,
        element: "plant",
        attackPower: 15,
        id: 6,
        sprite: "../miniApps/Loramon/assets/mysticaltree.png",
        back: "../miniApps/Loramon/assets/mysticaltreeback.png"
    },
    ssio: {
        name: "SSIO",
        hp: 100,
        maxhp: 100,
        element: "water",
        attackPower: 15,
        id: 7,
        sprite: "../miniApps/Loramon/assets/ssio.png",
        back: "../miniApps/Loramon/assets/ssioback.png"
    },
    sundoomer: {
        name: "SunDoomer",
        hp: 100,
        maxhp: 100,
        element: "fire",
        attackPower: 15,
        id: 8,
        sprite: "../miniApps/Loramon/assets/sundoomer.png",
        back: "../miniApps/Loramon/assets/sundoomerback.png"
    },
    swagoli: {
        name: "Swagoli",
        hp: 110,
        maxhp: 100,
        element: "plant",
        attackPower: 15,
        id: 9,
        sprite: "../miniApps/Loramon/assets/swagoli.png",
        back: "../miniApps/Loramon/assets/swagoliback.png"
    },
    ugandan: {
        name: "Ugandan",
        hp: 110,
        maxhp: 100,
        element: "fire",
        attackPower: 15,
        id: 10,
        sprite: "../miniApps/Loramon/assets/ugandan.png",
        back: "../miniApps/Loramon/assets/ugandanback.png"
    }
};
class Loramon {
    constructor(name, hp, maxhp, element, attackpower, id, sprite, back){
        this.name = name;
        this.hp = hp;
        this.maxhp = maxhp;
        this.element = element;
        this.attackpower = attackpower;
        this.id = id;
        this.sprite = sprite; 
        this.back = back;

    }

    

    attack(target){
        target.hp = Math.max(0, target.hp - this.attackpower);
        console.log(`${this.name} attacked ${target.name} with a powerful attack`);
        
        updateBattleUI();
        
        if (target.hp <= 0) {
           alert(`${target.name} fainted!`);
           winLoramon(this, target);
           } 
           else
           if (this.hp <= 0){
           alert(`${this.name} fainted!`);
           loseLoramon(this, target);
           }
        }
    

    isAlive(){
        if (this.hp > 0){
            return true;
        } else {
            return false;
        }
        
    }
}

function updateLoramonImage() {
    console.log("Function called!"); // Check if function is being called
    const choice = document.getElementById("playerChoice").value;
    console.log("Selected choice:", choice); // Verify selected value
    
    const data = LORAMON_DATA[choice];
    console.log("Data retrieved:", data); // Check if data exists
    
    if (!data) {
        console.error("Invalid choice:", choice);
        return;
    }

    const img = document.getElementById("loramon1");
    console.log("Image element:", img); // Verify element exists
    
    img.src = data.sprite;
    img.alt = data.name;
    img.style.display = "block";
    img.hidden = false;
    
    console.log("Image src set to:", img.src); // Verify src was set
    console.log("Dimensions:", img.offsetWidth, "x", img.offsetHeight);
    document.getElementById("fightButton").style.display = "inline-block";

    window.playerChoice = choice;
    
}
function preloadImages() {
  Object.values(LORAMON_DATA).forEach(loramon => {
    new Image().src = loramon.sprite;      // Preload front
    new Image().src = loramon.back;  // Preload back
  });
}
function battleLoramon(){
    preloadImages();
    if (battleInterval) clearInterval(battleInterval);
    
    const choice = document.getElementById("playerChoice").value;
    
    // Get player data from LORAMON_DATA
    const playerData = LORAMON_DATA[choice];
    
    // Random enemy (excluding player's choice)
    const keys = Object.keys(LORAMON_DATA).filter(k => k !== choice);
    const randomEnemyKey = keys[Math.floor(Math.random() * keys.length)];
    const enemyData = LORAMON_DATA[randomEnemyKey];
    
    // Create Loramon instances
    playerLoramon = new Loramon(playerData.name,
    playerData.hp,
    playerData.maxhp,
    playerData.element,
    playerData.attackPower,
    playerData.id,
    playerData.back,
    playerData.sprite
    );
    enemyLoramon = new Loramon(enemyData.name,
    enemyData.hp,
    enemyData.maxhp,
    enemyData.element,
    enemyData.attackPower,
    enemyData.id,
    enemyData.back,
    enemyData.sprite
    );
    
    // Update UI
    

    document.getElementById("div:loramon-select-team").style.display = "none";
    document.querySelector(".battle-screen").style.display = "block";
    
    // Set sprites

    img1 = document.getElementById("player");
    img2 = document.getElementById("enemy");

    img1.src = playerLoramon.sprite; 
    img2.src = enemyLoramon.back;
    
    
    // Set names
    document.getElementById("player-name").textContent = playerLoramon.name;
    document.getElementById("enemy-name").textContent = enemyLoramon.name;
    
    // Initialize HP bars
    updateBattleUI();
    
    // Start battle
    battleInterval = setInterval(performBattleTurn, 1500);
}
function performBattleTurn() {
    if (!playerLoramon.isAlive() || !enemyLoramon.isAlive()) {
        if (battleInterval) clearInterval(battleInterval);
        return;
    }

    // Player attacks first, then enemy
    playerLoramon.attack(enemyLoramon);
    
    if (enemyLoramon.isAlive()) {
        setTimeout(() => {
            enemyLoramon.attack(playerLoramon);
        }, 750);
    }
}
function updateBattleUI() {
    if (playerLoramon) {
        const playerHp = document.getElementById("player-hp");
        playerHp.max = playerLoramon.maxhp;
        playerHp.value = playerLoramon.hp;
        document.getElementById("hp-text").textContent = 
            `${playerLoramon.hp}/${playerLoramon.maxhp}`;
    }

    if (enemyLoramon) {
        const enemyHp = document.getElementById("enemy-hp");
        enemyHp.max = enemyLoramon.maxhp;
        enemyHp.value = enemyLoramon.hp;
    }
}
function attack() {
    if (playerLoramon && enemyLoramon && playerLoramon.isAlive() && enemyLoramon.isAlive()) {
        playerLoramon.attack(enemyLoramon);
        
        if (enemyLoramon.isAlive()) {
            setTimeout(() => {
                enemyLoramon.attack(playerLoramon);
            }, 1000);
        }
    }
}
function resetGame() {
    document.getElementById("div:loramon-select-team").style.display = "block";
    document.querySelector(".battle-screen").style.display = "none";
    
    // Reset Loramon selection
    document.getElementById("loramon1").style.display = "none";
    document.getElementById("fightButton").style.display = "none";
    
    playerLoramon = null;
    enemyLoramon = null;
}
function initGame() {
    document.querySelector(".battle-screen").style.display = "none";
    document.getElementById("fightButton").style.display = "none";
}



