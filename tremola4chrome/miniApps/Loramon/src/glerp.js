// script.js

var lobby;
let peerEnemyId;
let lobbyNumber;

function loramon_load_list() {
  closeOverlay();
  console.log("probiere die lobby zu laden...");
  let lst = document.getElementById('div:loramon-title-menu');
  lst.innerHTML = '';
  if (typeof tremola.loramon == "undefined")
    tremola.loramon = { 'active': {}, 'closed': {} }
  for (var nm in tremola.loramon.active) {
    if (nm == "undefined")
      continue
    let g = tremola.loramon.active[nm];
    let item = document.createElement('div');
    var row = "<button class='loramon_list_button' onclick='loramon_load_lobby(\"" + nm + "\");' style='overflow: hidden; width: 70%; background-color: #ebf4fa;'>";
    row += "<div style='white-space: nowrap;'><div style='text-overflow: ellipsis; overflow: hidden;'>"
    row += "Battle with " + fid2display(g.peer) + "<br>";
    row += g.state;
    if (g.state == 'closed')
      row += " " + g.close_reason;
    else if (g.state == 'invited')
      row += " (click here to accept)"
    row += "</div></button></div>"
    var btxt;
    if (g.state == 'invited')     btxt = 'decline';
    else if (g.state == 'closed') btxt = 'delete';
    else                          btxt = 'end';
    row += `<button class='loramon_list_button' style='width: 20%; text-align: center;' onclick='loramon_list_callback("${nm}","${btxt}")'>${btxt}</button>`;
    // console.log("list building " + row)
    item.innerHTML = row;
    lst.appendChild(item);
  }
}

const anotherGlobalWindow = window.top || window; // Ensures cross-context access

if (!anotherGlobalWindow.miniApps) {
    anotherGlobalWindow.miniApps = {}; 
}

anotherGlobalWindow.miniApps["loramon"] = {}

anotherGlobalWindow.miniApps["loramon"].handleRequest = function(command, args) {
    console.log("LoRamon handling request:", command);
    switch (command) {
      case "onBackPressed":
          console.log("LoRamonScenario: ", LoramonScenario);
          if (LoramonScenario === 'loramon-battle-scene') {
              setLoramonScenario('loramon-title-menu');
          } else if (LoramonScenario === 'loramon-title-menu') {
              document.body.style.backgroundImage = "url('../assets/splash-as-background.jpg')";
              document.body.style.backgroundSize = "cover";
              document.body.style.backgroundPosition = "center";
              quitApp();
          } //else {
          //     quitApp();
          // }
          break;
      case "plus_button":
          console.log("LoRamon plus_button");
          loramon_new_game();
          break;
      case "members_confirmed":
          console.log("LoRamon members_confirmed");
          loramon_new_game_confirmed();
          break;
      case "b2f_initialize":
          console.log("LoRamon b2f_initialize");
          loramon_load_list();
          break;
      case "b2f_new_event":
          console.log("LoRamon b2f_new_event");
          loramon_load_list();
          break;
      case "incoming_notification": //incoming_notification
          console.log("LoRamon incoming_notification:", JSON.stringify(args, null, 2));
          decodeLoramonRequest(args.args);
          break;
    }
    return "Response from LoRamon";
};

function loramon_new_game() {
    launchContactsMenu('LoRamon', 'Pick a friend to fight against');
    readLogEntries(10);
}

function loramon_new_game_confirmed() {
    console.log("loramon_new_game_confirmed");
    for (var m in tremola.contacts) {
        if (m != myId && document.getElementById(m).checked) {
            console.log("loramon invite " + m)
            //generate random number to use as game reference
            let randomNum = Math.floor(Math.random() * 1000000);
            lobbyNumber = randomNum;
            // json structure with type, from, and to
            let json = { type: 'N', from: myId, to: m, nm: myId + "" + m + "" + randomNum, lobbyid: randomNum };
            peerEnemyId = m;
            lobby = new Lobby(myId, m, lobbyNumber);
            console.log("loramon invite " + JSON.stringify(json))
            writeLogEntry(JSON.stringify(json));
            break;
        }
    }
    if (curr_scenario == 'members')
        setLoramonScenario('loramon-title-menu')
}

function loramon_list_callback(nm,action) {
  let g = tremola.loramon.active[nm]
  if (action == 'accept') {
      let json = { type: 'A', nm: nm };
      writeLogEntry(JSON.stringify(json));
  }
  else if (action == 'end' || action == 'decline') {
      let json = { type: 'E', nm: nm, from: myId };
      writeLogEntry(JSON.stringify(json));
  }
  else if (action == 'delete') {
    delete tremola.loramon.active[nm];
    tremola.loramon.closed[nm] = g.peer; // remember peer
    persist();
  }
  loramon_load_list();
}

function decodeLoramonRequest(request) {
    var args = request; // request is a stringified JSON array
    console.log("Type: ", args[0]?.type); // Add optional chaining to avoid errors
    loramon_on_rx(args, 0);
}

function loramon_on_rx(args, index=0) {
  console.log("loramon_on_rx args " + JSON.stringify(args));
  if (typeof tremola.loramon == "undefined")
    tremola.loramon = { 'active': {}, 'closed': {} }
  let ta = tremola.loramon.active;
  // if (args[index].from != myId && args[index].to != myId)
  //       return;
  if (args[index].type == 'N') {
    // ignore messages if neither sender nor recepient
    if (args[index].from != myId && args[index].to != myId)
        return;

    lobbyNumber = args[index].lobbyid;

    if (args[index].to == myId) {
      lobby = new Lobby(args[index].from, myId, lobbyNumber);
    } 

    ta[args[index].nm] = {
      'peer': args[index].to == myId ? args[index].from : args[index].to,
      'state': args[index].to == myId ? 'invited' : 'inviting',
      'close_reason': '',
      'loramons': [playerTeam, enemyTeam], // all loramons, two triplets
      'lobby': lobby,
      'move': '',
      'cnt': 0,
    }
    persist();
    if (LoramonScenario == 'loramon-title-menu')
      loramon_load_list();
    return;
  }
  let g = ta[args[index].nm];
  if (args[index].type == 'A') { // accepts
      if (g.state == 'inviting' || g.state == 'invited') { //
        if (g.state == 'invited')
            g.cnt = 1;
        g.state = 'open';
        persist();
        if (LoramonScenario == 'loramon-title-menu')
          loramon_load_list();
      } // else discard
      return;
  }
  if (args[index].type == 'E') { // end
      g.state = 'closed';
      g.close_reason = 'by ' + (args[index].from == myId ? 'myself' : 'peer');

  // TODO: überall board durch loramon related sachen ersetzen

  } if (args[index].type == 'M' && args[index].from != myId && args[index].to == myId) { // move
      let moveType = args[index].moveType;
      if (moveType == 'change') {
        let loramonIndex = args[index].lIndex;
        enemyLoramon = enemyTeam[loramonIndex];
      } else if (moveType == 'attack') {
        getAttacked();
        lobby.set_turn(myId);
      }
  } else if (args[index].type == 'G') { // give up
      g.state = 'closed';
      g.close_reason = args[index].from == myId ? loramon_igaveup : loramon_ogaveup;
  } else if (args[index].type == 'V') { // violation
      g.state = 'closed';
      g.close_reason = '(protocol violation)';
  } else if (args[index].type == 'S' && args[index].from != myId && args[index].to == myId) { // hier loramon logik
      let team = args[index].team;
      console.log("Receiving enemy team: ", team);
      setEnemyLoramonTeam(team);
      readyForFight();
  } 
}

function loramon_load_lobby(nm) {
  console.log("load lobby " + nm)
  let g = tremola.loramon.active[nm];
  if (g.state == 'inviting')
    return;
  if (g.state == 'invited') {
    loramon_list_callback(nm,'accept');
    return;
  }
  tremola.loramon.current = nm;
  setLoramonScenario('loramon-select-team')
}

function setLoramonTeam(){
  updateLoramonImage(myId);
}

function setEnemyLoramonTeam(team){
  // buildEnemyTeam(team); better approach, not working yet
  console.log("enemy team received ", team);
  // this data needs to be reconstructed because got it from JSON. otherwise wont be able to access methods
  let enemyTeamReconstructed = team.map(data => new Loramon(
    data.name,
    data.hp,
    data.maxhp,
    data.element,
    data.attackpower,
    data.id,
    data.sprite,
    data.back
  ));
  lobby.set_team_by_id(lobby.return_other_id(myId), enemyTeamReconstructed);
}

function enemyTeamCallback() {
  // would be better :P but we can create loramons by value, not by name
  // let teamNames = [];
  // for (let i = 0; i < lobby.get_team_by_id(myId).length; i++) {
  //   teamNames[i] = lobby.get_team_by_id(myId)[i].name;
  // } ...
  let json = { type: 'S', from: myId, to: lobby.return_other_id(myId), team: lobby.get_team_by_id(myId)};
  writeLogEntry(JSON.stringify(json));  
}
// TODO: die logik ist noch nicht implementiert
function switchLoramon(){
  switchToTeamMember(index);
}

function attackMove(){
  console.log("My ID and the turn: ", myId, lobby.get_turn());

  if (lobby.get_turn() == myId) {
      console.log("Trying to attack: ", enemyLoramon);
      attack();
      lobby.make_move(myId);
      let json = { type: 'M', from: myId, to: lobby.return_other_id(myId), moveType: "attack"};
      writeLogEntry(JSON.stringify(json));    
  } else {
    console.log("Not my turn...");
  }
}

function readyForFight() {
  document.getElementById("fightLabel").style.display = "inline-block";
  document.getElementById("fightButton").style.display = "none";
  let readyTeam = lobby.get_team_by_id(myId).every(x => x !== 0);
  let readyEnemy = lobby.get_team_by_id(lobby.return_other_id(myId)).every(x => x !== 0);
    if (readyTeam && readyEnemy) {
      document.getElementById("fightLabel").style.display = "none";
      startBattleScene()
      battleLoramon();
    }
}