const express = require('express')
const firebase = require('firebase');
const bodyParser = require("body-parser");
const app = express()

// firebase config
var firebase_config = {
    apiKey: "AIzaSyCQzUnyLAzfRwLHctj2RqCfSDqfpO9pXdE",
    authDomain: "kbook2-1ce98.firebaseapp.com",
    databaseURL: "https://kbook2-1ce98.firebaseio.com",
    projectId: "kbook2-1ce98",
    storageBucket: "kbook2-1ce98.appspot.com",
    messagingSenderId: "101241005137"
};
firebase.initializeApp(firebase_config);
var DB = firebase.database().ref('/nodetest');

// listen for fb events
var count = 0;
DB.on("child_added", function (snap) {
    count++;
    console.log("added:", snap.key);
});


// middleware ... all requests use this
app.use(bodyParser.json());


// Hello World!
app.get('/', (req, res) => {
    console.log(req.content);
    res.send('Hello World!')
});

// Simple echo for testing
app.post('/echo', (req, res) => {
    console.log(req.body);
    var ts = (new Date()).toISOString();
    var data = { "_ts": ts, "body": req.body, "params": req.params, "query": req.query };
    res.send(data);
});

// push request info to a test list
app.post('/push', (req, res) => {
    console.log(req.body);
    var ts = (new Date()).toISOString();
    var data = { "_ts": ts, "body": req.body, "params": req.params, "query": req.query };
    DB.push(data);
    res.send(data);
});

// get a list of the requests pushed
app.get('/list', (req, res) => {
    console.log(req.body);
    DB.once("value", function (data) {
        res.send(data);
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))