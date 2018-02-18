'use strict';
const express = require('express');
const app = express();
const Storage = require('@google-cloud/storage');
const nodemailer = require('nodemailer');
var admin = require("firebase-admin");
var router = express.Router();
var path = __dirname
var sslRedirect = require('heroku-ssl-redirect');
var serviceAccount = require("./app-l-133e5-firebase-adminsdk-kemeu-749ebb53bd.json");
var gcloud = require('google-cloud');
var bodyParser = require('body-parser');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://app-l-133e5.firebaseio.com",
  storageBucket: "gs://app-l-133e5.appspot.com/"
});


var db = admin.database();
var ref = db.ref();



// Initialize GCS
var gcs = gcloud.storage({
  projectId: 'app-l-133e5',
  keyFilename: './app-l-133e5-firebase-adminsdk-kemeu-749ebb53bd.json'
})

const storage = new Storage({
  projectId: "app-l-133e5",
  keyFilename: './app-ly-4ef2871c1aa4.json'
});

// var bucket = admin.storage().bucket();
var bucket = storage.bucket("app-l-133e5.appspot.com");
app.use(sslRedirect());
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
app.get('/home.html', function (req, res) {
  alert('hit root')
});
app.post('/checkWebsite', function (req, res) {
  console.log("Link to check: "+JSON.stringify(req.body))
  var link = req.body.applink
  if(link.includes(".")){
    res.send(true)
  }
  else{
    res.send(false)
  }
});
app.get('/', function (req, res) {
  sendfile("home.html")
  console.log("Hehe")
});
app.post('/create', function (req, res) {
  //sendfile("home.html")
  console.log("Hehe")
});
app.post('/updateAccount/:uid', function (req, res) {
  //sendfile("home.html")
  admin.auth().getUser(req.params.uid)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully fetched user data:", userRecord.toJSON());
    var strippedEmail = userRecord.email.split('@');
    var uID = strippedEmail[0];
  ref.child("Users/"+strippedEmail[0].toLowerCase()).update(req.body);
  })
  console.log("Updated user account")
});
app.post('/updateResume/:uid', function (req, res) {
  admin.auth().getUser(req.params.uid)
  .then(function(userRecord) {
  console.log(JSON.stringify(req.body) + " stuff")
  var strippedEmail = userRecord.email.split('@');
  var uID = strippedEmail[0].toLowerCase();
    ref.child("Users/"+uID).update({
    "resume": req.body.resume
  });
})
});
app.post('/updateCover', function (req, res) {
  admin.auth().getUser(req.params.uid)
  .then(function(userRecord) {
  console.log(JSON.stringify(req.body) + " stuff")
  var strippedEmail = userRecord.email.split('@');
  var uID = strippedEmail[0].toLowerCase();
    ref.child("Users/"+uID).update({
    "cover": req.body.cover
  });
})
});

app.get('/loadAccount/:uid', function (req, res) {
  admin.auth().getUser(req.params.uid)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    //console.log("Successfully fetched user data:", userRecord.toJSON());
    var strippedEmail = userRecord.email.split('@');
    var uID = strippedEmail[0].toLowerCase();
    db.ref("Users/"+uID+"/").once('value', function(snapshot) {
      var record = {
      "fname_reg" : snapshot.child("fName").val(),
      "lname_reg" : snapshot.child("lName").val(),
      "email_reg" : snapshot.child("email").val(),
      "phone_reg" : snapshot.child("phone").val(),
      "address_reg" : snapshot.child("address").val(),
      "city_reg" : snapshot.child("city").val(),
     "state_reg" : snapshot.child("state").val(),
      "zip_reg" : snapshot.child("zip").val(),
     "alert": snapshot.child("alerts").val(),
     "country_reg" : snapshot.child("country").val(),
     "tags_reg" : snapshot.child("tags").val(),
     "travel_reg" : snapshot.child("travel").val(),
     "password_reg" : snapshot.child("password").val(),
     "industry" : snapshot.child("industry").val(),
     "resume" : snapshot.child("resume").val()
   }
   if(snapshot.hasChild("cover")){
   record["hasCover"] = true
   record["cover"] = snapshot.child("cover").val()
 }else{
   record["hasCover"] = false
 }
   res.send(record)
    })
  })
  .catch(function(error) {
    console.log("Error fetching user data:", error);
  });
});
app.post('/uploadResume/:file', function (req, res) {
  storage
    .bucket("app-l-133e5.appspot.com")
    .upload(req.params.file)
    .then(() => {
      console.log(`success`);
    })
    .catch(err => {
      console.error('ERROR:', err);
      res.send(err)
    });


});
app.get('/downloadResume/:uid', function (req, res) {
  admin.auth().getUser(req.params.uid)
  .then(function(userRecord) {
    var strippedEmail = userRecord.email.split('@');
    var uID = strippedEmail[0].toLowerCase();
  db.ref("Users/"+uID+"/").once('value', function(snapshot) {
      if (snapshot.hasChild("resume")){
        res.send(snapshot.child("resume").val())
      }
      else {
        res.send(false)
      }
  })
  })
});
app.post('/updateCoverLink/:uid/:coverLink', function (req, res) {
  admin.auth().getUser(req.params.uid)
  .then(function(userRecord) {
    var strippedEmail = userRecord.email.split('@');
    var uID = strippedEmail[0].toLowerCase();
  db.ref.child("Users").child(uID).update({cover:req.params.coverLink})
  })
});
app.get('/downloadCover/:uid', function (req, res) {
  admin.auth().getUser(req.params.uid)
  .then(function(userRecord) {
    var strippedEmail = userRecord.email.split('@');
    var uID = strippedEmail[0].toLowerCase();
  db.ref("Users/"+uID+"/").once('value', function(snapshot) {
      if (snapshot.hasChild("cover")){
        res.send(snapshot.child("cover").val())
      }
      else {
        res.send(false)
      }
  })
  })
});
app.post('/createUser', function (req, res) {
  var newUser = req.body
  admin.auth().createUser({
    email: req.body.email,
    emailVerified: false,
    phoneNumber: req.body.phone,
    password: req.body.password,
    displayName: req.body.fName + " "+ req.body.lName,
    photoURL: "",
    disabled: false
  })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user:", userRecord.uid);
      var strippedEmail = userRecord.email.split('@');
      ref("Users/"+strippedEmail[0].toLowerCase()).set(newUser);
      })
    .catch(function(error) {
      console.log("Error creating new user:", error);
    });

})
app.post('/createUserData', function (req, res) {
  var newUser = req.body
  var strippedEmail = req.body["email"].split('@');
  var uID = strippedEmail[0].toLowerCase();
  if(newUser["resume"] == null || newUser["resume"] == "" || !newUser["resume"].includes(".pdf")){
    res.status(500)
    res.send("Please enter a resume with PDF format")
  }
  else{
  ref.child("Users").child(uID).set(newUser)
  res.status(200)
  res.send("Created user")
}
})
app.get('/loadTable/:uid', function (req, res) {
    admin.auth().getUser(req.params.uid)
    .then(function(userRecord) {
      var strippedEmail = userRecord.email.split('@');
      ref.child("Users/"+strippedEmail[0].toLowerCase()).once('value', function(snapshot) {
         //console.log("Data: "+JSON.stringify(snapshot.val()))
         if(snapshot.child("isResumePass").child("pass").val() == false){
           res.status(200).send(snapshot.child("isResumePass").val())

           return
         }
         else{
           ref.child("Users/"+strippedEmail[0].toLowerCase()+"/jobLinks").once('value', function(snapshot) {
              res.status(200).send(snapshot.val())
            })
         }
       })

  })
})
app.get('/getResume', function (req, res) {
  var database = admin.database();
  console.log(database)
   database.ref('test').set({
      username: "hA",
    });
    // res.send("Called getResume")
    // console.log("lol")
    // alert('Test')
    res.send(req.params)
    // sendfile("home.html")
});
app.get('/authenticate/:uid', function (req, res) {
  //console.log("ID: "+req.params.uid)
  admin.auth().verifyIdToken(req.params.uid)
  .then(function(decodedToken) {
    var uid = decodedToken.uid;

    // ...
    console.log("Succesfully authenticated user")
    //console.log("UID: "+uid)
  }).catch(function(error) {
    // Handle error
    console.log("Error authenticating user "+error)
  });
  //sendfile("home.html")
  //console.log("Hehe")
});
//Not complete, need download blob
app.get('/upload/:file',function(req, res){
  console.log("Uploading file...")
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.params.file + ".pdf");
  console.log(req.params.file)
  const blobStream = blob.createWriteStream();
  blobStream.on('error', (err) => {
    res.send(err)
    console.log(err)
  });
  blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      //const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      res.send("Uploaded file");
      console.log("Uploaded file")
  });
  blobStream.end(req.params.file.buffer);
  console.log("Done with upload/file request")
})
app.post('/requestAnalysis/:uid', function (req, res) {
  admin.auth().getUser(req.params.uid)
  .then(function(userRecord) {
    var strippedEmail = userRecord.email.split('@');
    var uID = strippedEmail[0];
    req.body["user"] = uID
    req.body["email"] = userRecord.email
    ref.child("ResumeQueue/").push().set(req.body);
    res.send("SUCCESS")
  })
})
app.post('/postFeedback/:uid', function (req, res) {
  admin.auth().getUser(req.params.uid)
  .then(function(userRecord) {
    var strippedEmail = userRecord.email.split('@');
    var uID = strippedEmail[0];
    req.body["user"] = uID
    ref.child("Feedback/").push().set(req.body);
    res.send("SUCCESS")
  })
})

app.get('/sendmail',function(req, res){
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
      res.send(req.params)
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: account.user, // generated ethereal user
              pass: account.pass  // generated ethereal password
          }
      });

      // setup email data with unicode symbols
      let mailOptions = {
          from: '"Fred Foo 👻" <questuncc@gmail.com>', // sender address
          to: 'msalad@uncc.edu', // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world?', // plain text body
          html: '<b>Hello world?</b>' // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
  });
})




app.listen(process.env.PORT || 8080, () => console.log(__dirname));
