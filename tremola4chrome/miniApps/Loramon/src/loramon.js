"use strict";

function loramon_load_list() {
    console.log("Loading invoked...");
    closeOverlay();
    let lst = document.getElementById('div:loramon-list');
    lst.innerHTML = '';
    lst.style.display = null;
    
    let item = document.createElement('div');
    item.innerHTML = `
        <button class='loramon_list_button' style='width: 70%;' onclick='startLoramonGame("friend_id")'>
            LoRamon with Alice<br>Status: invited
        </button>
        <button class='loramon_list_button' style='width: 20%;' onclick='exitLoramon()'>
            decline
        </button>
    `;
    lst.appendChild(item);
}

function exitLoramon() {
    console.log("Exiting LoRamon...");

    // Hide all LoRamon-related containers
    document.getElementById('div:loramon-list').style.display = 'none';
    document.getElementById('div:loramon-title-menu').style.display = 'none';
    document.getElementById('div:loramon-select-team').style.display = 'none';
    document.getElementById('div:loramon-battle-scene').style.display = 'none';

    // Optionally clear the list for cleanup
    document.getElementById('div:loramon-list').innerHTML = '';

    // Show Tremola’s main UI back
    document.getElementById("tremolaTitle").style.display = null;
    document.getElementById("conversationTitle").style.display = 'none';
}



// Handle invitation
function handleLoramonInvite() {
}

// Handle acceptance
function handleLoramonAccept() {
}

// Handle move
function handleLoramonMove() {

    // You will implement actual gameplay logic here, e.g.:
    // - Apply damage to enemy
    // - Check if enemy fainted
    // - Determine if battle is won/lost
    // - Switch turn

    // Example placeholder:
    if (payload.move === "attack") {
        battle.logs.push(`Attack performed by ${from}`);
    }
}

// Handle give up
function handleLoramonGiveUp() {
    battle.logs.push(`${from} gave up`);
}

// Function to send actions to the log
function sendLoramonAction() {
    const msg = {
        type: "loramon",
        action,
        battleId,
        payload,
        from: myId
    };
    writeLogEntry(JSON.stringify(msg));
}

// Example usage functions for your buttons or UI:
// call sendLoramonAction("invite", battleId, { enemyTeam: [...] })
// call sendLoramonAction("accept", battleId, {})
// call sendLoramonAction("move", battleId, { move: "attack" })
// call sendLoramonAction("give_up", battleId, {})

//  No scenario switching or DOM manipulation here
