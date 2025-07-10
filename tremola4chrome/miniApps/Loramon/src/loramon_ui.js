// loramon_ui.js - Clean, robust, consistent scenario management
"use strict";

var LORAMON_SCENARIO = null;

function setLoramonScenario(scenario) {
    console.log("Setting LoRamon scenario:", scenario);
    LORAMON_SCENARIO = scenario;

    // Always hide all scenes first
    const scenes = ['div:loramon-title-menu', 'div:loramon-select-team', 'div:loramon-battle-scene'];
    scenes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // Show current scene
    const showId = scenario.replace('-', ':');
    const currentEl = document.getElementById(showId);
    if (currentEl) currentEl.style.display = 'block';

    // Background handling for title screen only
    if (scenario === 'loramon-title-menu') {
        document.body.style.backgroundImage = "url('../miniApps/Loramon/assets/backgroundLoramon.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    } else {
        document.body.style.backgroundImage = "";
    }

    // Scenario-specific loading
    if (scenario === 'loramon-title-menu') {
        loadLoramonFriendsList();
    } else if (scenario === 'loramon-select-team') {
        document.body.style.backgroundImage = "url('../miniApps/Loramon/assets/backgroundSelect.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        loadLoramonTeamSelection();
    } else if (scenario === 'loramon-battle-scene') {
        document.body.style.backgroundImage = "url('../miniApps/Loramon/assets/backgroundSelect.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        startLoramonBattle();
    }
}
window.setLoramonScenario = setLoramonScenario;

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


window.miniApps["loramon"] = {
    handleRequest: function(command, args) {
        console.log("LoRamon handleRequest:", command);
        switch (command) {
            case "onBackPressed":
                if (LORAMON_SCENARIO === 'loramon-battle-scene') {
                    setLoramonScenario('loramon-select-team');
                } else if (LORAMON_SCENARIO === 'loramon-select-team') {
                    setLoramonScenario('loramon-title-menu');
                } else {
                    quitApp();
                }
                break;
            case "plus_button":
                if (LORAMON_SCENARIO === 'loramon-title-menu') inviteLoramonFriend();
                break;
            case "members_confirmed":
                if (LORAMON_SCENARIO === 'loramon-title-menu') {
                    confirmLoramonFriend();
                    setLoramonScenario('loramon-select-team');
                }
                break;
            case "b2f_initialize":
                setLoramonScenario('loramon-title-menu');
                break;
            case "b2f_new_event":
                if (LORAMON_SCENARIO === 'loramon-battle-scene') loadLoramonBattle();
                break;
            case "incoming_notification":
                handleLoramon(args.args);
                break;
        }
    }
};

function inviteLoramonFriend() {
    console.log("Inviting a friend for LoRamon...");
    launchContactsMenu("LoRamon Battle", "Pick a friend to challenge!");
}

function confirmLoramonFriend() {
    console.log("Friend confirmed, proceeding to team selection...");
}
