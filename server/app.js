const express = require('express')
var firebase = require('firebase');
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

// middleware ... all requests use this
app.use(bodyParser.json());


app.get('/', (req, res) => {
    console.log(req.content);
    res.send('Hello World!')
});

// Simple echo for testing
app.post('/echo', (req, res) => {
    console.log(req.body);
    var data = { "body": req.body, "params": req.params, "query": req.query };
    firebase.database().ref('/nodetest').push(data);
    res.send(data);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))