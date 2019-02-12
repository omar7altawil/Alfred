'use strict';


var admin = require("firebase-admin");

var serviceAccount = require("/home/omar/Desktop/SuperS/supers/supers-87d35-firebase-adminsdk-oizo3-454ae9147b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://supers-87d35.firebaseio.com"
});
var room="Al yasat hall"
var db = admin.database();
// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

const config = {
    logging: true,
};


const app = new App(config);





// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'LAUNCH': function() {
        this.ask('<voice name="Brian"><lang xml:lang="en-GB">Hallo sir, I am alfred your home assistants,how may i help you today?.</lang></voice>');
    },

    'EventsIntent': async function() {
        var ref = db.ref('/'+room+"/events");
        var event=await ref.once("value").then((snapshot) =>{
            return snapshot.val();});
        this.tell('<voice name="Brian"><lang xml:lang="en-GB">'+event.toString()+'</lang></voice>');
    },
    'TemperatureIntent':async function() {
        var ref = db.ref('/'+room+"/temperature");
        var temperature=await ref.once("value").then((snapshot) =>{
            return snapshot.val();});
            this.tell('<voice name="Brian"><lang xml:lang="en-GB">the temperature right now in the Multipurpose Room, is '+temperature+" Celsius</lang></voice>");
    },
    'lightintent':async function() {
        var ref = db.ref('/'+room+"/light");
        var light=await ref.once("value").then((snapshot) =>{
            return snapshot.val();});
            this.tell('<voice name="Brian"><lang xml:lang="en-GB">the light right now in the Multipurpose Room, is '+light+"</lang></voice>");
    },
    'EventIntent':async function() {
        var ref = db.ref('/'+room+"/cevent");
        var cevent=await ref.once("value").then((snapshot) =>{
            return snapshot.val();});
            this.tell('<voice name="Brian"><lang xml:lang="en-GB">right now I can hear '+cevent+ " in the Multipurpose Room </lang></voice>");
    },
    'consumptionIntent':async function() {
        var ref = db.ref('/'+room+"/waterconsumption");
        var waterconsumption=await ref.once("value").then((snapshot) =>{
            return snapshot.val();});
            this.tell('<voice name="Brian"><lang xml:lang="en-GB">The total water consumption for the month of December so far is '+waterconsumption+" liters</lang></voice>");
    },
});

module.exports.app = app;
