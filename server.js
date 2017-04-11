var five = require("johnny-five");
var board = new five.Board();
var express = require ('express');
var app = express();


app.use(express.static(__dirname + '/public'));     //répertoire pour css, JS...

// app.get('/', function(req, res, next) {
//   res.sendFile(__dirname+'/index.html') //envoi du fichier html 
// });

board.on("ready", function() {                      //connection à la board donc Arduino

  console.log('Arduino is ready.');

  var unknow  = new five.Relay(11);                 // ID = relay sur pin 11.
  var plug    = new five.Relay(10);                 // ID = relay sur pin 10.
  var light   = new five.Relay(9);                  // ID = relay sur pin 9.

  // Control the relay in real time
  // from the REPL by typing commands, eg.
  
  // relay.on() or relay.open();
  
  // relay.off() or relay.close();
 
  this.repl.inject({
    relay: relay
  });
});

    // open() Open the circuit.

    // close() Close the circuit.

    // toggle() Toggle the circuit open/close.

var port = process.env.PORT || 8080;                //regarde l'environnement et process du port 8080

server.listen(port);                                //écoute sur le port 8080

console.log(`Server listening on http://localhost:${port}`);