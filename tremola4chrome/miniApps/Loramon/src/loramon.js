"use strict";

function loramon_load_list() {
    console.log("Loading invoked...");
    closeOverlay();
    let lst = document.getElementById('div:loramon-list');
    lst.innerHTML = '';
    lst.style.display = null;
    
    let item = document.createElement('div');
    item.innerHTML = `
        <button class='loramon_list_button' style='width: 70%;' onclick='joinLoramonGame()'>
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




