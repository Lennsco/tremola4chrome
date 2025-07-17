let playerLoramon = null;
let enemyLoramon = null;
let battleInterval = null;
var playerTeam = [0, 0, 0];
let currentPlayerIndex = 0;
var enemyTeam = [0, 0, 0];
let currentEnemyIndex = 0;
let isTeamPanelOpen = false;

const ELEMENTAL_ADVANTAGE = {
    water: {
        strongAgainst: "fire",
        weakAgainst: "plant"
    },
    fire: {
        strongAgainst: "plant",
        weakAgainst: "water"
    },
    plant: {
        strongAgainst: "water",
        weakAgainst: "fire"
    }
};

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
    aliendog: {
        name: "Aliendog",
        hp: 100,
        maxhp: 100,
        element: "plant",
        attackPower: 15,
        id:2,
        sprite: "../miniApps/Loramon/assets/aliendog.png",
        back: "../miniApps/Loramon/assets/aliendogback.png"
    },
    bluebert: {
        name: "Bluebert",
        hp: 100,
        maxhp: 100,
        element: "water",
        attackPower: 25,
        id: 3,
        sprite: "../miniApps/Loramon/assets/bluebert.png",
        back: "../miniApps/Loramon/assets/bluebertback.png"
    },
    chillguy: {
        name: "ChillGuy",
        hp: 100,
        maxhp: 100,
        element: "water",
        attackPower: 15,
        id: 4,
        sprite: "../miniApps/Loramon/assets/chillguy.png",
        back: "../miniApps/Loramon/assets/chillguyback.png"
    },
    eggvance: {
        name: "EggVance",
        hp: 100,
        maxhp: 100,
        element: "fire",
        attackPower: 15,
        id: 5,
        sprite: "../miniApps/Loramon/assets/eggvance.png",
        back: "../miniApps/Loramon/assets/eggvanceback.png"
    },
    lophin: {
        name: "Lophin",
        hp: 100,
        maxhp: 100,
        element: "water",
        attackPower: 15,
        id: 6,
        sprite: "../miniApps/Loramon/assets/lophin.png",
        back: "../miniApps/Loramon/assets/lophinback.png"
    },
    mysticaltree: {
        name: "MysticalTree",
        hp: 100,
        maxhp: 100,
        element: "plant",
        attackPower: 15,
        id: 7,
        sprite: "../miniApps/Loramon/assets/mysticaltree.png",
        back: "../miniApps/Loramon/assets/mysticaltreeback.png"
    },
    ssio: {
        name: "SSIO",
        hp: 100,
        maxhp: 100,
        element: "water",
        attackPower: 15,
        id: 8,
        sprite: "../miniApps/Loramon/assets/ssio.png",
        back: "../miniApps/Loramon/assets/ssioback.png"
    },
    sundoomer: {
        name: "SunDoomer",
        hp: 100,
        maxhp: 100,
        element: "fire",
        attackPower: 15,
        id: 9,
        sprite: "../miniApps/Loramon/assets/sundoomer.png",
        back: "../miniApps/Loramon/assets/sundoomerback.png"
    },
    swagoli: {
        name: "Swagoli",
        hp: 110,
        maxhp: 100,
        element: "plant",
        attackPower: 15,
        id: 10,
        sprite: "../miniApps/Loramon/assets/swagoli.png",
        back: "../miniApps/Loramon/assets/swagoliback.png"
    },
    ugandan: {
        name: "Ugandan",
        hp: 110,
        maxhp: 100,
        element: "fire",
        attackPower: 15,
        id: 11,
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
           
        let damage = this.attackpower;
        let effectiveness = 1; // Neutral = 1x
        
        // Check for elemental advantage
        if (ELEMENTAL_ADVANTAGE[this.element].strongAgainst === target.element) {
            effectiveness = 1.5; // Super effective (50% bonus)
            console.log(`It's super effective!`);
        } 
        else if (ELEMENTAL_ADVANTAGE[this.element].weakAgainst === target.element) {
            effectiveness = 0.5; // Not very effective (50% reduction)
            console.log(`It's not very effective...`);
        }
        damage = Math.floor(damage * effectiveness); // Round down
        target.hp = Math.max(0, target.hp - damage);
        updateBattleUI();
        
        return effectiveness;
    }
    
    isAlive(){
        if (this.hp > 0){
            return true;
        } else {
            return false;
        }
    }
}

function updateLoramonImage(player) {
    console.log("Function called!"); // Check if function is being called
    // 3 pokemon teams
    const choice1 = document.getElementById("playerChoice1").value;
    console.log("choise 1", choice1);
    if (choice1){
        addLoramonToTeam(choice1, 0, "loramon1", player);
    } 

    const choice2 = document.getElementById("playerChoice2").value;
    console.log("choise 2", choice2);
    if (choice2) {
        addLoramonToTeam(choice2, 1, "loramon2", player);
    }

    const choice3 = document.getElementById("playerChoice3").value;
    console.log("choise 3", choice3);
    if (choice3) {
        addLoramonToTeam(choice3, 2, "loramon3", player);
    }

    const allNonZero = lobby.get_team_by_id(myId).every(x => x !== 0);

    if (playerTeam.length === 3 && allNonZero) {
        currentPlayerIndex = 0;
        playerLoramon      = playerTeam[currentPlayerIndex];
        document.getElementById("fightButton").style.display = "inline-block";
        enemyTeamCallback();
    }
}

function addLoramonToTeam(key, slotIndex, imgId, player) {
    const data = LORAMON_DATA[key];
    if (!data) {
        console.error("Invalid choice:", key);
        return;
    }
    // Check if this Loramon is already in the team
    let team = lobby.get_team_by_id(player);
    const alreadyInTeam = team.some(loramon => loramon?.id === data.id);
    if (alreadyInTeam) {
        // Only show alert if trying to add to a different slot
        if (!team[slotIndex] || team[slotIndex].id !== data.id) {
            alert(`${data.name} is already in your team!`);
            return;
        }
        return false;
    }
    // Create or replace the slot
    let chosenLoramon = new Loramon(
        data.name,
        data.hp,
        data.maxhp,
        data.element,
        data.attackPower,
        data.id,
        data.sprite,  // Front sprite first
        data.back     // Back sprite second
    );

    lobby.set_loramon_by_id(player, chosenLoramon, slotIndex);
    playerTeam[slotIndex] = chosenLoramon;

    const img = document.getElementById(imgId);
    if (img) {
        img.src = data.sprite;
        img.alt = data.name;
        img.style.display = "block";
    }
}

function buildEnemyTeam(team) {
    for (let i = 0; i < team.length; i++) {
        const singleKey = team[i];
        const data = LORAMON_DATA[singleKey];

        let slotIndex = i;

        if (!data) {
            console.error("Invalid choice:", singleKey);
            return;
        } 

        let chosenLoramon = new Loramon(
            data.name,
            data.hp,
            data.maxhp,
            data.element,
            data.attackPower,
            data.id,
            data.sprite,  // Front sprite first
            data.back     // Back sprite second
        );
        
        let player = '';
        player = lobby.return_other_id(myId);
        lobby.set_loramon_by_id(player, chosenLoramon, slotIndex);
    }
}

//helper function, not really necessary
function preloadImages() {
  Object.values(LORAMON_DATA).forEach(loramon => {
    new Image().src = loramon.sprite;      // Preload front
    new Image().src = loramon.back;  // Preload back
  });
}
//for starting to battle, not the atack
function battleLoramon(){
    let player = '';
    player = lobby.return_other_id(myId);
    enemyTeam = lobby.get_team_by_id(player);
    playerTeam = lobby.get_team_by_id(myId);
    currentPlayerIndex = 0;
    currentEnemyIndex  = 0;

    playerLoramon = playerTeam[currentPlayerIndex];
    enemyLoramon = enemyTeam[currentEnemyIndex];

    preloadImages();

    if (battleInterval) clearInterval(battleInterval);

    // Update UI
    document.getElementById("div:loramon-select-team").style.display = "none";
    document.getElementById("div:loramon-battle-scene").style.display = "block";
    
    // Set sprites
    img1 = document.getElementById("player");
    img2 = document.getElementById("enemy");

    img1.src = playerLoramon.back; 
    img2.src = enemyLoramon.sprite;
    
    console.log("path to sprite: ", img2.src);

    // Set names
    document.getElementById("player-name").textContent = playerLoramon.name;
    document.getElementById("enemy-name").textContent = enemyLoramon.name;
    
    // Initialize HP bars
    updateBattleUI();   

    playBackgroundMusic()
}

//for choosing other loramons during battle
function switchLoramon(slot) {
    /* slot = 0,1,2  (buttons or <select> can call switchLoramon(1), etc.) */
    if (slot === currentPlayerIndex)      return;          // already active
    if (!playerTeam[slot])              return;          // not chosen
    if (!playerTeam[slot].isAlive())    return;          // fainted

    currentPlayerIndex = slot;
    playerLoramon    = playerTeam[slot];

    //after switch, show full info about switched pokemon on battlefield
    document.getElementById("loramon1").src = playerLoramon.sprite;
    document.getElementById('player-name').textContent = playerLoramon.name;
    document.getElementById('player-name').src = playerLoramon.back;
    updateHpBars(); //updates
    updateBattleUI(); //updates
}
//helper function 
function updateHpBars() {
    /* player */
    document.getElementById("player-hp").value =
        playerLoramon.hp;
    document.getElementById("player-hp").max   =
        playerLoramon.maxhp; //reason for distinction between hp and maxhp
    /* enemy */
    document.getElementById("enemy-hp").value  =
        enemyLoramon.hp;
    document.getElementById("enemy-hp").max    =
        enemyLoramon.maxhp;
}

function updateSelectedLoramon(){
    currentPlayerIndex = 0;
    currentEnemyIndex  = 0;

    playerLoramon = playerTeam[currentPlayerIndex];
    enemyLoramon = enemyTeam[currentEnemyIndex];
}

function updateBattleUI() {
    if (playerLoramon) {
        const playerImg = document.getElementById("player");
        const playerHpBar = document.getElementById("player-hp");
        
        // Update sprite if different
        if (playerImg.src !== playerLoramon.back) {
            playerImg.src = playerLoramon.back;
        }
        
        playerHpBar.max = playerLoramon.maxhp;
        playerHpBar.value = playerLoramon.hp;
        document.getElementById("player-hp-text").textContent = 
            `${playerLoramon.hp}/${playerLoramon.maxhp}`;
    }
    if (enemyLoramon) {
        const enemyImg = document.getElementById("enemy");
        if (enemyImg.src !== enemyLoramon.sprite) {
            enemyImg.src = enemyLoramon.sprite;
        }
        const enemyHpBar = document.getElementById("enemy-hp");
        enemyHpBar.max = enemyLoramon.maxhp;
        enemyHpBar.value = enemyLoramon.hp;
        document.getElementById("enemy-hp-text").textContent = 
            `${enemyLoramon.hp}/${enemyLoramon.maxhp}`;
    }
    // Refresh team display if panel is open
    if (isTeamPanelOpen) { //teampanel for switching loramons
        displayTeam();
    }
}

function attack() {
    console.log("Checking if both loramons aren't null: ", playerTeam, enemyTeam);
    if (!playerLoramon?.isAlive() || !enemyLoramon?.isAlive()) return;
     
    displayAttack(playerLoramon);

    // Player attacks
    const effectiveness = playerLoramon.attack(enemyLoramon);
    showEffectivenessMessage(effectiveness);
    if (!enemyTeam || enemyTeam.length === 0) {
        console.error("No enemy team exists!");
        return;
    }
    if (!enemyLoramon.isAlive()) {
        setTimeout(() => handleEnemyFaint(), 1000);
        return;
    }
}

function getAttacked() {
    if (!playerLoramon?.isAlive() || !enemyLoramon?.isAlive()) return;

    displayAttack(playerLoramon); // should be the receiving end, displayGetAttacked()
     
    const effectiveness = enemyLoramon.attack(playerLoramon);
    showEffectivenessMessage(effectiveness);
    if (!playerTeam || playerTeam.length === 0) {
        console.error("No player team exists!");
        return;
    }
    if (!playerLoramon.isAlive()) {
        setTimeout(() => handlePlayerFaint(), 1000);
        return;
    }
}

function handleEnemyFaint() {
   if (!enemyLoramon) return;
    //alert(`${enemyLoramon.name} fainted!`); too much alerts yk, got ugly af
    currentEnemyIndex++;

    if (currentEnemyIndex < enemyTeam.length) {
        enemyLoramon = enemyTeam[currentEnemyIndex];
        if (!enemyLoramon) {
            console.error("Enemy Loramon is null!");
            return;
        }
        // Update UI
        const enemyImg = document.getElementById("enemy");
        if (enemyImg) {
            enemyImg.src = enemyLoramon.sprite;
        }
        document.getElementById("enemy-name").textContent = enemyLoramon.name;
        updateBattleUI();
        alert(`${enemyLoramon.name} enters the battle!`);
    } else {
        alert("You win! All enemy Loramon fainted.");
        resetGame();
    }
}
function handlePlayerFaint() {
    if (!playerLoramon) return;
    // Find next alive team member
    const nextIndex = playerTeam.findIndex(loramon => loramon?.isAlive());
    
    if (nextIndex >= 0) {
        playerLoramon = playerTeam[nextIndex];
        if (!playerLoramon) {
            console.error("Player Loramon is null!");
            return;
        }
    
        const playerImg = document.getElementById("player");
        if (playerImg) {
            playerImg.src = playerLoramon.back;
        }
        document.getElementById("player-name").textContent = playerLoramon.name;
        updateBattleUI();
        
        alert(`${playerLoramon.name} enters the battle!`);
    } else {
        alert("All your Loramon have fainted! You lose!");
        resetGame();
    } 
}
function toggleTeam() { //Team Panel for seeing own loramons
    const p = document.getElementById('team-panel');
    isTeamPanelOpen = !isTeamPanelOpen;
    p.style.display = isTeamPanelOpen ? 'block' : 'none';
    
    // Refresh team display when opening
    if (isTeamPanelOpen) {
        displayTeam();
    }
}
function displayTeam() { 
    const teamDisplay = document.getElementById('team-display');
    teamDisplay.innerHTML = '';
    playerTeam.forEach((loramon, index) => {
        const memberDiv = document.createElement('div');
        memberDiv.style.textAlign = 'center';
        memberDiv.style.padding = '5px';
        memberDiv.style.border = currentPlayerIndex === index ? '2px solid blue' : '1px solid gray';
        memberDiv.style.borderRadius = '5px';
        memberDiv.style.backgroundColor = loramon.hp <= 0 ? '#ffcccc' : '#f0f0f0';
        
        const img = document.createElement('img');
        img.src = loramon.sprite;
        img.alt = loramon.name;
        img.width = 60;
        img.style.cursor = loramon.hp > 0 ? 'pointer' : 'not-allowed';
        img.onclick = loramon.hp > 0 ? () => switchLoramon(index) : null;
        
        const hpText = document.createElement('div');
        hpText.textContent = `${loramon.hp}/${loramon.maxhp}`;
        hpText.style.color = loramon.hp <= 0 ? 'red' : 'black';
        hpText.style.fontSize = '12px';
        
        memberDiv.appendChild(img);
        memberDiv.appendChild(hpText);
        teamDisplay.appendChild(memberDiv);
    });
}
function switchToTeamMember(index) {
    // dont switch if invalid
    if (index === currentPlayerIndex || 
        !playerTeam[index] || 
        !playerTeam[index].isAlive()) {
        return;
    }
    currentPlayerIndex = index;
    playerLoramon = playerTeam[index];
    
    // update battle display
    const playerImg = document.getElementById("player");
    if (playerImg) {
        playerImg.src = playerLoramon.sprite;
    }
    document.getElementById("player-name").textContent = playerLoramon.name;
    updateBattleUI();
    
    // team panel if open
    if (isTeamPanelOpen) {
        displayTeam();
    }
}
function showEffectivenessMessage(effectiveness) {
    const messageBox = document.getElementById('battle-message');
    
    if (effectiveness === 1.5) {
        messageBox.textContent = "It's super effective!";
        messageBox.style.color = "#027608ff"; // Green
    } 
    else if (effectiveness === 0.5) {
        messageBox.textContent = "It's not very effective...";
        messageBox.style.color = "#750e04ff"; // Red
    } else {
        messageBox.textContent = ""; // Neutral, no message
    }

    // hide comment after 1 second
    setTimeout(() => {
        messageBox.textContent = "";
    }, 1000);
}
function resetGame() { //we go back to select screen, no save, nothing
    document.getElementById("div:loramon-screen").style.display = "block";
    document.querySelector(".battle-screen").style.display = "none";

    stopBackgroundMusic()
    
    // Reset Loramon selection
    document.getElementById("loramon1").style.display = "none";
    document.getElementById("loramon2").style.display = "none";
    document.getElementById("loramon3").style.display = "none";
    document.getElementById("fightButton").style.display = "none";
    
    playerTeam = [];
    enemyTeam  = [];
    playerLoramon = null;
    enemyLoramon  = null;
}


function displayAttack(loramonAttack){
    const animation = document.getElementById("attack-animation");
    let duration;
    let attackAnimation = "";
    switch (loramonAttack.element){
        case "fire":
            attackAnimation = "../miniApps/LoRamon/assets/fire.gif";
            animation.src = attackAnimation;
            animation.style.display = "block";
            animation.style.left = "170px";
            animation.style.top = "100px";
            setTimeout(() => {
            animation.style.display = "none";
            },4300);
            break;
        case "water":
            //attackAnimation = "../assets/water.gif";
            attackAnimation = "../miniApps/LoRamon/assets/water.gif";
            animation.src = attackAnimation;
            animation.style.display = "block";
            animation.style.left = "270px";
            animation.style.top = "10px";
            setTimeout(() => {
            animation.style.display = "none";
            },3500)
            break;
        case "plant":
            attackAnimation = "../miniApps/LoRamon/assets/pflanze.gif";
            console.log("printing path: ", document.currentScript.src);
            animation.src = attackAnimation;
            animation.style.display = "block";
            animation.style.left = "150px";
            animation.style.top = "150px";
            setTimeout(() => {
            animation.style.display = "none";
            },1250)
            break;
        default:
            console.warn("Unknown Loramon type: ", loramonAttack.element);
        }
}


function playBackgroundMusic(){
    const music = document.getElementById("battle-music");
    if(music){
        music.volume = 0.5;
        music.play().catch(err => console.warn("Playing Music blocked: ", err));
    }
}

function stopBackgroundMusic(){
    const music = document.getElementById("battle-music");
    if(music){
        music.pause();
        music.currentTime = 0; // rewind
    }
}