var five      = require("johnny-five");
var board     = new five.Board();
var express   = require ('express');
var app       = express();

app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  next(); 
});

app.use(express.static(__dirname + '/public'));     //répertoire pour css, JS...

board.on("ready", function() {                      //connection à la board donc Arduino

  console.log('Arduino is ready.');

  // var unknow    = new five.Relay(11);                 // ID = relay sur pin 11.
  var plug      = new five.Relay({
                    pin: 10, 
                    type: "NO"
                  });                                 // ID = relay sur pin 10.
  var light     = new five.Led(9);                  // ID = relay sur pin 9.

  plug.off();
  light.off();
 
  var pin = new five.Pin({
    pin: 6,
    type: "digital",
    mode: "input"
  });

  app.get('/relays', function(req, res){

    res.json(plug.isOn);
    res.json(light.isOn);
    // pin.read(function(error, value) {
    //   console.log(value);
    // });
  });

  app.get('/all/off', function(req, res){

    plug.off();
    light.off();
  });

   app.get('/all/on', function(req, res){

    plug.on();
    light.on();
  });

  app.get('/plug', function(req, res){

    res.json(plug.isOn);
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


  app.get('/plug/on', function(req, res){ 

    plug.on();

  });

  app.get('/plug/off', function(req, res){

    plug.off();
    
  });

  app.get('/light/on', function(req, res){

    light.on();
    
  });

  app.get('/light/off', function(req, res){ 

    light.off();
    
  });

  this.repl.inject({
    relay: plug
  });
});

var port = process.env.PORT || 8080;                //regarde l'environnement et process du port 8080

app.listen(port);                                //écoute sur le port 8080

console.log(`Serveur écoute sur http://localhost:${port}`);
