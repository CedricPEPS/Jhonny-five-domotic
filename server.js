var five      = require("johnny-five");
var board     = new five.Board();
var express   = require ('express');
var app       = express();
var NanoTimer = require('nanotimer');
var count     = 10;
var ledVerte  = null;
var ledRouge  = null;


app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
  next(); 
});


app.use(express.static(__dirname + '/public'));     //répertoire pour css, JS...

// app.get('/', function(req, res, next) {
//   res.sendFile(__dirname+'/index.html') //envoi du fichier html 
// });

board.on("ready", function() {                      //connection à la board donc Arduino

  console.log('Arduino is ready.');

  ledVerte      = new five.Led(11);
  ledRouge      = new five.Led(9);

  var unknow    = new five.Relay(11);                 // ID = relay sur pin 11.
  var plug      = new five.Relay({
                    pin: 10, 
                    type: "NO"
                  });                                 // ID = relay sur pin 10.
  var light     = new five.Relay(9);                  // ID = relay sur pin 9.

  // Control the relay in real time
  // from the REPL by typing commands, eg.
  
  // relay.on() or relay.open();
  
  // relay.off() or relay.close();
  plug.off();
  var timer     = new NanoTimer();
  var etatRelay = plug.isOn;



var pin = new five.Pin({
  pin: 6,
  type: "digital",
  mode: "input"
});

  app.get('/check', function(req, res){


    res.json(plug.isOn);
    pin.read(function(error, value) {
  console.log(value);
});


  })


  app.get('/plug/on', function(req, res){

     

plug.on();
    


  })



  app.get('/plug/off', function(req, res){

     

plug.off();
    


  })



  // plug.on();
  // // etatRelayByLed();
  // timer.setInterval(countDown, '', '1s');
  // timer.setTimeout(liftOff, [timer], '10s');
  
  // console.log(plug.isOn);
  // etatRelayByLed();
 



  // this.pinMode(6, five.Pin.INPUT);
  // this.digitalRead(6, function(value) {

  //   if (value == true) {
  //     ledRouge.off();
  //     ledVerte.on();
  //     console.log('relay on');
  //   }
  //   else{
  //     ledVerte.off();
  //     ledRouge.on();
  //     console.log('relay off');
  //   }
  // });



  
  // function etatRelayByLed(){

  //   if (plug.isOn == true) {
  //     ledRouge.off();
  //     ledVerte.on();
  //   }
  //   else{
  //     ledVerte.off();
  //     ledRouge.on();
  //   }
  // }
  // function liftOff(timer){
  //   timer.clearInterval();
  //   plug.off();
  //   // etatRelayByLed();
  //   // ledRouge.on();
  //   // ledVerte.off();
  //   console.log('plug is '+plug.isOn);
  // }
  // function countDown(){
  //   console.log('H - ' + count);
  //   count--;
  // }










  this.repl.inject({
    relay: plug
  });
});

    // open() Open the circuit.

    // close() Close the circuit.

    // toggle() Toggle the circuit open/close.

var port = process.env.PORT || 8080;                //regarde l'environnement et process du port 8080

app.listen(port);                                //écoute sur le port 8080

console.log(`Server listening on http://localhost:${port}`);
