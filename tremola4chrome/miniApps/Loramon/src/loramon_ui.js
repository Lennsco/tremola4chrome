"use strict";

// Current scenario tracker
var LORAMON_SCENARIO = null;

// Use consistent namespace for global clarity
function setLoramonScenario(scenario) {
    console.log("Setting LoRamon scenario:", scenario);

    // List of all divs used in LoRamon (adjust if you add more later)
    const loramonDivs = [
        'div:loramon-title-menu',
        'div:loramon-select-team',
        'div:loramon-battle-scene'
    ];

    // Display control
    loramonDivs.forEach(divId => {
        const el = document.getElementById(divId);
        if (el) {
            el.style.display = (divId === scenario.replace('-', ':')) ? 'block' : 'none';
        }
    });
    LORAMON_SCENARIO = scenario;

    // Load any data needed for the scenario
    if (scenario === 'loramon-title-menu') {
        document.body.style.backgroundImage = "url('../miniApps/Loramon/assets/backgroundLoramon.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundColor = "white";
        // Prepare friend invitation or state refresh if needed
        loadLoramonFriendsList();
    } else if (scenario === 'loramon-select-team') {
        loadLoramonTeamSelection();
    } else if (scenario === 'loramon-battle-scene') {
        loadLoramonBattle();
    }
}
window.setLoramonScenario = setLoramonScenario;


// Example function to load friend list or invitation logic
function loadLoramonFriendsList() {
    console.log("Loading friend list for LoRamon...");
    // You could call launchContactsMenu here if you want
    document.getElementById("tremolaTitle").style.display = 'none';
    var c = document.getElementById("conversationTitle");
    c.style.display = null;
    c.innerHTML = "<font size=+1><strong>LoRamon</strong><br>Pick or create a new game</font>";
     document.getElementById('div:loramon-list').style.display = null;

    // Hide other LoRamon scenes
    document.getElementById('div:loramon-title-menu').style.display = 'none';
    document.getElementById('div:loramon-select-team').style.display = 'none';
    document.getElementById('div:loramon-battle-scene').style.display = 'none';

    loramon_load_list();
    loramon_load_list();
}

// Example function to handle team selection loading
function loadLoramonTeamSelection() {
    console.log("Loading team selection screen...");
    // Populate selectable monsters for user to pick
}

// Example function to handle battle UI loading
function loadLoramonBattle() {
    console.log("Loading battle scene...");
    // Initialize battle state visualization
}

// Handle back button and plus button in your manifest
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
                    quitApp(); // Exit the app if on title screen
                }
                break;
            case "plus_button":
                // In Title Menu: start invite friend flow
                if (LORAMON_SCENARIO === 'loramon-title-menu') {
                    inviteLoramonFriend();
                }
                break;
            case "members_confirmed":
                // Friend selected, proceed to team selection
                if (LORAMON_SCENARIO === 'loramon-title-menu') {
                    confirmLoramonFriend();
                    setLoramonScenario('loramon-select-team');
                }
                break;
            case "b2f_initialize":
                setLoramonScenario('loramon-title-menu');
                break;
            case "b2f_new_event":
                // Refresh state on new event
                if (LORAMON_SCENARIO === 'loramon-battle-scene') {
                    loadLoramonBattle();
                }
                break;
            case "incoming_notification":
                handleLoramon(args.args);
                break;
        }
    }
};

