window.miniApps["loramon"] = {
    handleRequest: function(command, args) {
    console.log("loramon handling request:", command);
    switch (command) {
    case "incoming_notification":
    console.log("loramon incoming_notification:",
   JSON.stringify(args, null, 2));
    handleLoramon(args.args);
    break;
    }
    return "Response from loramon";
    }
   };
   function initLoramon() {
    console.log("Initializing loramon app...");
   }
   function handleLoramon(args) {
    if (args && args[0].type === "loramon") {
   const loramonPrompt = document.getElementById('div:loramon-prompt');
    loramonPrompt.style.opacity = 1;
   setTimeout(() => {
   loramonPrompt.style.opacity = 0;
    }, 1000);
    }
}
   function registerLoramon() {
    let json = { type: 'loramon'};
    writeLogEntry(JSON.stringify(json));
}