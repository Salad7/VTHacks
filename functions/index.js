const functions = require('firebase-functions');
const express = require('express');
const app = express();
const Storage = require('@google-cloud/storage');
var admin = require("firebase-admin");
var router = express.Router();
var path = __dirname
var serviceAccount = require("./lucky9-fa8f4-firebase-adminsdk-b7rh0-683cda9810.json");
var gcloud = require('google-cloud');
var bodyParser = require('body-parser');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lucky9-fa8f4.firebaseio.com",
  storageBucket: "gs://lucky9-fa8f4.appspot.com/"
});
var db = admin.database();
var ref = db.ref();
// Initialize GCS
var gcs = gcloud.storage({
  projectId: 'lucky9-fa8f4',
  keyFilename: './lucky9-fa8f4-firebase-adminsdk-b7rh0-683cda9810.json'
})

const storage = new Storage({
  projectId: "lucky9-fa8f4",
  keyFilename: './lucky9-fa8f4-firebase-adminsdk-b7rh0-683cda9810.json'
});

// var bucket = admin.storage().bucket();
var bucket = storage.bucket("lucky9-fa8f4.appspot.com");
// app.use(sslRedirect());
app.use(express.static(__dirname))
app.use(function(req, res, next) {
    res.header('X-XSS-Protection', 0);
      res.header("Access-Control-Allow-Origin", '*');
       res.header("Access-Control-Allow-Credentials", true);
       res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
       res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/Images'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.get('/', function (req, res) {
  console.log("Updated user account")
  //Call firebase
});
