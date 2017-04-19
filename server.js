var five      = require("johnny-five");
var board     = new five.Board();
var express   = require ('express');
var app       = express();
var server = require('http').createServer(app);     
//retourne une nouvelle instance de http.server
var io = require('socket.io')(server);

app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  next(); 
});

app.use(express.static(__dirname + '/public'));     //répertoire pour css, JS...

board.on("ready", function() {                      //connection à la board donc Arduino

  console.log('Arduino is ready.');

  var unknow    = new five.Led(11);                 // ID = relay sur pin 11.
  var plug      = new five.Relay({
                    pin: 10, 
                    type: "NO"
                  });                                 // ID = relay sur pin 10.
  var light     = new five.Led(9);                  // ID = relay sur pin 9.

  plug.off();
  light.off();
  unknow.off();
 
  var pin = new five.Pin({
    pin: 6,
    type: "digital",
    mode: "input"
  });

  app.get('/relays', function(req, res){

    res.json(plug.isOn);
    res.json(light.isOn);
    res.json(unknow.isOn);
    // pin.read(function(error, value) {
    //   console.log(value);
    // });
  });

  app.post('/all/off', function(req, res){

    plug.off();
    light.off();
    unknow.off();
    res.json("ok off");
  });

   app.post('/all/on', function(req, res){

    plug.on();
    light.on();
    unknow.on();

    res.json("ok on");
  });

  app.get('/plug', function(req, res){

    var result = plug.isOn;


    res.json(result);
    // pin.read(function(error, value) {
    //   console.log(value);
    // });
  });

  app.get('/light', function(req, res){

    res.json(light.isOn);
    // pin.read(function(error, value) {
    //   console.log(value);
    // });
  });

  app.get('/unknow', function(req, res){

    res.json(unknow.isOn);
    // pin.read(function(error, value) {
    //   console.log(value);
    // });
  });


  app.post('/plug/on', function(req, res){ 

    plug.on();
    res.json("ok on");

  });

  app.post('/plug/off', function(req, res){

    plug.off();
    res.json("ok off");
    
  });

  app.post('/light/on', function(req, res){

    light.on();
    res.json("ok on");
    
  });

  app.post('/light/off', function(req, res){ 

    light.off();
    res.json("ok off");
    
  });

  app.post('/unknow/on', function(req, res){

    unknow.on();
    res.json("ok on");
    
  });

  app.post('/unknow/off', function(req, res){ 

    unknow.off();
    res.json("ok off");
    
  });

  this.repl.inject({
    relay: plug
  });
});
// io.on('connection', function(client) {        //connection du socket
//     client.on('join', function(handshake) {     //réception de l'html pour validation de la connection
//       console.log(handshake);
//       console.log(plug.isOn);
//       socket.emit('etat', {
//         plug : plug.isOn,
//         light : light.isOn,
//         unknow : unknow.isOn
//       });
//     });

var port = process.env.PORT || 8080;                //regarde l'environnement et process du port 8080

app.listen(port);                                //écoute sur le port 8080

console.log(`Serveur écoute sur http://localhost:${port}`);
