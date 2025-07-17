"use strict";

var LoramonScenario = null;

function setLoramonScenario(s) {
    LoramonScenario = s; 

    console.log("setLoramonScenario", s);

    console.log("scenarioDisplay", scenarioDisplay);

    var lst = scenarioDisplay[s];
    console.log("scenarioDisplay", lst);
    //load_board_list();

    display_or_not.forEach(function (d) {
        console.log(d);
        let element = document.getElementById(d);
        if (element) {
            if (lst.indexOf(d) < 0) {
                element.style.display = 'none';
            } else {
                element.style.display = null;
            }
        } else {
            console.warn(`Element with ID '${d}' not found.`);
        }
    });

    const currentEl = document.getElementById(s);
    if (currentEl) currentEl.style.display = 'block';

    // Scenario-specific loading
    if (s === 'loramon-title-menu') {
        document.body.style.backgroundImage = "url('../miniApps/Loramon/assets/backgroundLoramon.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        loadLoramonFriendsList();
    } else if (s === 'loramon-select-team') {
        document.body.style.backgroundImage = "url('../miniApps/Loramon/assets/backgroundSelect.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        loadLoramonTeamSelection();
    } else if (s === 'loramon-battle-scene') {
        document.body.style.backgroundImage = "url('../miniApps/Loramon/assets/backgroundSelect.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        startLoramonBattle();
    } else {
        document.body.style.backgroundImage = "url('../assets/splash-as-background.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }

}

function loadLoramonFriendsList() {
    console.log("Loading LoRamon Friends List...");
    document.getElementById("tremolaTitle").style.display = 'none';
    const conv = document.getElementById("conversationTitle");
    conv.style.display = 'block';
    conv.innerHTML = "<strong>LoRamon</strong><br>Pick or create a new game";

    document.getElementById('div:loramon-list').style.display = 'block';
    loramon_load_list();
}

function loadLoramonTeamSelection() {
    console.log("Loading LoRamon Team Selection...");

    // Ensure ONLY the selection screen is visible
    document.getElementById('div:loramon-title-menu').style.display = 'none';
    document.getElementById('div:loramon-list').style.display = 'none';
    document.getElementById('div:loramon-battle-scene').style.display = 'none';
    document.getElementById('div:loramon-select-team').style.display = 'block';

    // Reset selection UI
    document.getElementById("fightButton").style.display = "none";
    document.getElementById("loramon1").style.display = "none";

    // Optionally reset player choice
    document.getElementById("playerChoice").selectedIndex = 0;

    // Optionally preload images
    if (typeof preloadImages === "function") preloadImages();
}


function joinLoramonGame(){
    console.log("Joining Game...");
    // Hide the list
    document.getElementById('div:loramon-list').style.display = 'none';

    // Transition to the selection screen
    setLoramonScenario('loramon-select-team');
}

function startBattleScene() {
    console.log("Starting LoRamon Battle Scene...");
    lobby.set_lobby_status(true);
    setLoramonScenario('loramon-battle-scene');
}

function startLoramonBattle(){
    console.log("Loading LoRamon Battle Scene...");
    //Only battle scene is visible
    document.getElementById('div:loramon-title-menu').style.display = 'none';
    document.getElementById('div:loramon-list').style.display = 'none';
    document.getElementById('div:loramon-battle-scene').style.display = 'block';
    document.getElementById('div:loramon-select-team').style.display = 'none';
}

    /*
    if (s == 'tictactoe-board') {
        document.getElementById("tremolaTitle").style.display = 'none';
        var c = document.getElementById("conversationTitle");
        c.style.display = null;
        let fed = tremola.tictactoe.active[tremola.tictactoe.current].peer
        c.innerHTML = `<font size=+1><strong>TTT with ${fid2display(fed)}</strong></font>`;
    } 
    */
