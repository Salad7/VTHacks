

function checkUserLoggedIn(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    redirectHome()
  } else {
    // No user is signed in.
  }
});
}

function loadFooter(){
  document.getElementById("footerArea").innerHTML =   '<div class="container">'+
      '<div class="content has-text-centered" >'+
      '  <p >'+
      '    <br></br>'+
      '    <strong>Quest</strong> by <a href="https://github.com/Salad7/VTHacks">Lucky 9</a>.'+
      '  </p>'+
    '</div>'+
    '</div>'
}
function isSelectIndustry(){
  var soFlow = document.getElementById('soflow')
  if(soFlow.selectedIndex == 0){
    alert("Please select an industry")
    return false
  }
  return true
}
function accountListener(){
  var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('resumeFileAccount').onchange = function() {
      // fire the upload here
      var email = document.getElementById('email_reg').value;
      var strippedEmail = email.split('@');
      var uID = strippedEmail[0];
      var storage = firebase.storage();
      var resumeReference = storage.ref('Resume/'+uID+Math.floor(Math.random() * 20)+'.pdf');
      var resumeFile = document.getElementById("resumeFileAccount")
      var resumeIn = resumeFile.files[0]
      if(resumeIn){
      var rRef = resumeReference.put(resumeIn)
      rRef.on('state_changed',function(snapshot) {
    }, function(error){
      alert(error)
    }, function(){
      var updatedResume = {
        resume: rRef.snapshot.downloadURL
      }
        jQuery.ajax({
        url: "/updateResume/"+user.uid,
        type: "POST",
        data:updatedResume,
        success: function (data) {


        }
    });
    })
      }
      else{
        alert('Error uploading resume')
      }
  };
  document.getElementById('coverFileAccount').onchange = function() {
      var email = document.getElementById('email_reg').value;
      var strippedEmail = email.split('@');
      var uID = strippedEmail[0];
      var storage = firebase.storage();
      var coverReference = storage.ref('Cover/'+uID+Math.floor(Math.random() * 20)+'.pdf');
      var coverFile = document.getElementById("coverFileAccount")
      var coverIn = coverFile.files[0] // use the Blob or File API
      if(coverIn){
      var rRef = coverReference.put(coverIn)
      rRef.on('state_changed',function(snapshot) {
    }, function(error){
      alert(error)
    }, function(){
      var updatedCover = {
        cover: rRef.snapshot.downloadURL
      }
      jQuery.ajax({
      url: "/updateCover/"+user.uid,
      type: "POST",
      data:updatedCover,
      success: function (data) {
      }
  });
    })
      }
      else{
        alert('Error uploading resume')
      }
  };
}
})
}

function loadAccount(token){
  var resumeBtn = document.getElementById('resumeBtn')
  var coverBtn = document.getElementById('coverBtn')
  jQuery.ajax({
  url: "/loadAccount/"+token,
  type: "GET",
  success: function (data) {
           document.getElementById('fname_reg').value = data["fname_reg"]
           document.getElementById('lname_reg').value = data["lname_reg"]
           document.getElementById('email_reg').value = data["email_reg"]
           document.getElementById('phone_reg').value = data["phone_reg"]
           document.getElementById('address_reg').value = data["address_reg"]
           document.getElementById('city_reg').value = data["city_reg"]
          document.getElementById('state_reg').value = data["state_reg"]
           document.getElementById('zip_reg').value = data["zip_reg"]
          document.getElementById('alert').checked = data["alert"]
          document.getElementById('country_reg').value = data["country_reg"]
          document.getElementById('tags_reg').value = data["tags_reg"]
          document.getElementById('travel_reg').value = data["travel_reg"]
          document.getElementById('password_reg').value = data["password_reg"]
              var soFlow = document.getElementById('soflow')
              for(i = 0; i < soFlow.length; i++){
                if(soFlow.options[i].innerHTML == data["industry"]){
                  soFlow.selectedIndex = i;
             }
             }
              if(data["hasCover"]){
                coverBtn.disabled = false;
                coverBtn.enabled = true;
              }
              else{
                coverBtn.innerHTML = "No Cover Letter Online"
                coverBtn.disabled = true;
                coverBtn.enabled = false;
              }


  }
});
}

function downloadResume(){
  var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    //Redirect to home
    // User is signed in.
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    var storage = firebase.storage();
       $.get("/downloadResume/"+user.uid, function(data, status){
           var xhr = new XMLHttpRequest();
           xhr.responseType = 'blob';
           xhr.onload = function(event) {
             var blob = xhr.response;
           };
           xhr.open('GET', data);
           xhr.send();
           var a = document.createElement("a");
           a.href = data;
           a.download ='resume.pdf';
           document.body.appendChild(a);
           a.click();
     });
  });

     //alert('Thanks for tering'+user.username);
  } else {
    // No user is  signed in.
    redirectLogin()
  }
  });
}
function downloadCoverLetter(){
  var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    var storage = firebase.storage();
       $.get("/downloadCover/"+user.uid, function(data, status){
           var xhr = new XMLHttpRequest();
           xhr.responseType = 'blob';
           xhr.onload = function(event) {
             var blob = xhr.response;
           };
           xhr.open('GET', data);
           xhr.send();
           var a = document.createElement("a");
           a.href = data;
           a.download ='cover.pdf';
           document.body.appendChild(a);
           a.click();
     });
  });
     //alert('Thanks for tering'+user.username);
  } else {
    // No user is  signed in.
    redirectLogin()
  }
  });
}

function createUser(resumeLink,coverLink){
      if(isSelectIndustry() == false){
        return 0
      }
      var fName = document.getElementById('fname_reg').value
      var lName = document.getElementById('lname_reg').value;
      var email = document.getElementById('email_reg').value;
      var phone = document.getElementById('phone_reg').value;
      var address = document.getElementById('address_reg').value
      var city = document.getElementById('city_reg').value;
      var state = document.getElementById('state_reg').value;
      var zip = document.getElementById('zip_reg').value;
      var isAlert = document.getElementById('alert').checked;
      var country = document.getElementById('country_reg').value
      var tags = document.getElementById('tags_reg').value;
      var travel = document.getElementById('travel_reg').value;
      var password = document.getElementById('password_reg').value;
      var industry = document.getElementById('soflow').options[document.getElementById('soflow').selectedIndex].value;
      var database = firebase.database();
      var strippedEmail = email.split('@');
      var uID = strippedEmail[0];
       var userData = {
          fName: fName,
          lName: lName,
          email: email,
          phone: phone,
          password: password,
          address: address,
          city: city,
          state: state,
          zip: zip,
          country: country,
          tags: tags,
          travel: travel,
          alerts: isAlert,
          industry: industry,
          resume: resumeLink
      }
      if(coverLink != ""){
        userData["cover"] = cover
      }

      jQuery.ajax({
      url: "/createUserData",
      type: "POST",
      data:userData,
      success: function (data) {
            alert("Succesfully created user")
      },
      error: function (data) {
           alert("Failed to upload PDF resume ")


      }
  });

}

function register(){
  if(isSelectIndustry() == false){
    return 0
  }
var email = document.getElementById('email_reg').value;
var password = document.getElementById('password_reg').value;
var strippedEmail = email.split('@');
var uID = strippedEmail[0];
var storage = firebase.storage();
//Upload resume
var resumeReference = storage.ref('Resume/'+uID+Math.floor(Math.random() * 20)+'.pdf'); //Hi hacker =)
var resumeFile = document.getElementById("resumeFile")
var resumeIn = resumeFile.files[0] // use the Blob or File API
var resumeLink = ""
if(resumeIn){
var rRef = resumeReference.put(resumeIn)
rRef.on('state_changed',function(snapshot) {
}, function(error){
alert(error)
}, function(){
 resumeLink = rRef.snapshot.downloadURL
 createUser(resumeLink,"")
 firebase.auth().createUserWithEmailAndPassword(email, password)
.then(function(success){
  var coverReference = storage.ref('Cover/'+uID+Math.floor(Math.random() * 20)+'.pdf');
  var coverFile = document.getElementById("coverFile")
  var coverIn = coverFile.files[0]
  var coverLink = ""
  var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if(coverIn){
    var cRef = coverReference.put(coverIn)
    cRef.on('state_changed',function(snapshot) {
    }, function(error){
    alert(error)
    }, function(){
      alert("Cover uploaded")
    coverLink = cRef.snapshot.downloadURL
    $.post("/updateCoverLink/"+user.uid+"/"+coverLink, function(data, status){

    });
    })
    }
  }
})
})
 .catch(function(error) {
 var errorCode = error.code;
 var errorMessage = error.message;
 alert(errorMessage);
 return false;
 });
})
}
else{
  alert('Please upload a pdf resume')
}

return false;
}
function login(){
  var email = document.getElementById('email_login').value;
  var password = document.getElementById('password_login').value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  alert(errorMessage+" "+errorCode);

});
}

function logout(){
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  window.location.href = "index.html"
}).catch(function(error) {  // An error happened.
});
}
function hideAnalysis(){
  analysis = document.getElementById("analysis")
  analysis.style.display="none"
}
function botInspection(pass,message){
}
function populateTable(){
  var database = firebase.database();
  var table= document.getElementById("jobs");
     var i = 0;
     var row;
     var user = firebase.auth().currentUser;
     firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
       firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
         $.get("/loadTable/"+user.uid, function(data, status){
           if(data["pass"] == false){
              botInspection(data["pass"] ,data["reason"])
           }
           else{
            botInspection(true,"")
           if(Object.keys(data).length > 0){
             var container = document.getElementById("rootContainer").style.visibility = "visible"
            for (var key in data){
              var row = document.getElementById("row")
              var x = row.insertCell(0);
               var site = data[key]["website"]
               var title = data[key]["title"]
               if(title.length > 38){
                 newTitle = ""
                 for(n = 0; n < 38; n++){
                   newTitle = newTitle+title[n]
                 }
                 newTitle+=".."
                 title = newTitle
               }
               var company = data[key]["company"]
               var position = data[key]["id"]
               var score = data[key]["score"]
               var average = data[key]["average"]
               var ranking = data[key]["ranking"]
               var overview = data[key]["overview"][0]
               var tags = data[key]["tags"]
               var jobTitle = data[key]["title"]
               var date = data[key]["date"]
               var website = data[key]["website"]
               var userMentions = data[key]["userQualityList"]
               var jobMentions = data[key]["jlQualityList"]
               overview = overview.replace(/ /g, "0")
               var positives = data[key]["positives"]
               var suggestions = data[key]["suggestions"]
               positives = positives.replace(/ /g, "0")
               jobTitle = jobTitle.replace(/ /g, "0")
               suggestions = suggestions.replace(/ /g, "0")
               x.innerHTML = '<div class="card" id="cardItem" style="background:#ffffff;margin: auto;" >'+
                '<section class="hero">'+
                   '<div class="hero-body" style="padding:24px">'+
                     '<div class="container" style="display:inline-block">'+
                       '<h1 class="title " style="font-size:20px">'+
                         ''+title+''+
                       '</h1>'+
                       '<h2 class="subtitle" style="font-size:18px;margin-top:2px">'+
                         ''+company+''+
                       '</h2>'+
                    // ' </div>'+
                   '</div>'+
                 '</section>'+
                 '<nav class="level">'+
                 '  <div class="level-item has-text-centered">'+
                 '    <div class="c100 p'+score+' small" >'+
                 '        <span>'+score+'%</span>'+
                 '        <div class="slice">'+
                 '            <div class="bar"></div>'+
                 '            <div class="fill"></div>'+
                 '        </div>'+
                 '        <p class="subtitle" style="margin-top: 88px;">Score</p>'+
                 '    </div>'+
                 '  </div>'+
                 '  <div class="level-item has-text-centered">'+
                 '    <div class="c100 p'+average+' small" >'+
                 '        <span>'+average+'%</span>'+
                 '        <div class="slice">'+
                 '            <div class="bar"></div>'+
                 '              <div class="fill"></div>'+
                 '          </div>'+
                 '          <p class="subtitle" style="margin-top: 88px;">Average</p>'+
                 '    </div>'+
                 '  </div>'+
                 '  <div class="level-item has-text-centered">'+
                 '    <div class="c100 p98 small" >'+
                 '        <span>'+ranking+'</span>'+
                 '        <div class="slice">'+
                 '            <div class="bar"></div>'+
                 '            <div class="fill"></div>'+
                 '        </div>'+
                 '        <p class="subtitle" style="margin-top: 88px;">Ranking</p>'+
                 '      </div>'+
                 '  </div>'+
                 '</nav>'+
                 '<div style="margin: 0 auto;width:300px;height:60px; text-align: center;margin-top:48px" >'+
                 '<button  class= "downloadButton" id="analysisBtnView" onclick = viewAnalysis(\''+score+'\',"'+overview+'","'+positives+'","'+suggestions+'","'+tags+'","'+jobTitle+'","'+date+'","'+website+'","'+userMentions+'","'+jobMentions+'")  style="margin-top:4px;height:40px;width:130px;margin-right:8px;display: inline-block;border-radius: 500px;border:1px solid #448aff;background:#ffffff;color:#448aff;">View Analysis</button>'+
                 '<button  class= "downloadButton" onclick = openWebsite(\''+site+'\') style="height:40px;width:130px;margin-left:8px;display: inline-block;border-radius: 500px;border:1px solid #448aff;background:#ffffff;color:#448aff;transition-duration: 0.4s;">Visit Website</button>'+
                 '</div>'+
                 '</div>'+
               '</div>'
            }
           }
           else{
             noCards = document.getElementById("noCards")
             noCards.style.display="block"
             analysis = document.getElementById("analysis")
             analysis.style.display="none"
           }
         }
         })
       })

     }
   })
   analysis = document.getElementById("analysis")
   analysis.style.display="none"
}
function viewAnalysis(score,overview,positives,suggestions,tags,jobTitle,date,website,userMentions,jobMentions){
  t = tags.split(",")
  var tagsSpan = document.getElementById("tags")
  var microstrategy = document.getElementById("recommender")
  microstrategy.style.display = "block"
  tagsSpan.innerHTML = ""
  if(t.length > 12){
    for(m = 1; m < 12; m++){
      tagsSpan.innerHTML+= '<button class="button is-primary" style="margin-left:32px;margin-top:16px;">'+t[m]+'</button>'
    }
  }
  else{
    for(m = 1; m < t.length; m++){
      tagsSpan.innerHTML+= '<button class="button is-primary" style="margin-left:32px;margin-top:16px;">'+t[m]+'</button>'
    }
  }
  document.getElementById("banner_title").innerHTML = jobTitle.replace(/0/g, " ")
  document.getElementById("banner_date").innerHTML = date
  document.getElementById("banner_website").innerHTML = website
  document.getElementById("overall").innerHTML = 'Overall Score:<b>'+score+'</b>'
  // document.getElementById("overview").innerHTML = overview.replace(/0/g, " ")
  //document.getElementById("positives").innerHTML = positives.replace(/0/g, " ")
  //document.getElementById("suggestions").innerHTML = suggestions.replace(/0/g, " ")
  analysis.style.display="block"

  $('html,body').animate({
      scrollTop: $("#analysis").offset().top},
      'slow');
      analysis = document.getElementById("analysis")

      doubleGraph(userMentions,jobMentions)
      getRecommendedJobs()
}
function updateAccount(){
  if(isSelectIndustry() == false){
    return 0
  }
  var password = document.getElementById('password_reg').value;
  var user = firebase.auth().currentUser;
  var fName = document.getElementById('fname_reg').value
  var lName = document.getElementById('lname_reg').value;
  var email = document.getElementById('email_reg').value;
  var phone = document.getElementById('phone_reg').value;
  var address = document.getElementById('address_reg').value
  var city = document.getElementById('city_reg').value;
  var state = document.getElementById('state_reg').value;
  var zip = document.getElementById('zip_reg').value;
  var isAlert = document.getElementById('alert').checked;
  var country = document.getElementById('country_reg').value
  var tags = document.getElementById('tags_reg').value;
  var travel = document.getElementById('travel_reg').value;
  var industry = document.getElementById('soflow').options[document.getElementById('soflow').selectedIndex].value;
  var database = firebase.database();
  var strippedEmail = email.split('@');
  var uID = strippedEmail[0];
  var newUser = {
    fName: fName,
    lName: lName,
    email: email,
    phone: phone,
    address: address,
    city: city,
    state: state,
    zip: zip,
    country: country,
    tags: tags,
    travel: travel,
    alerts: isAlert,
    industry: industry
  }

  var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    //Redirect to home
    // User is signed in.
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      jQuery.ajax({
      url: "/updateAccount/"+user.uid,
      type: "POST",
      data:newUser,
      success: function (data) {

        }
      });

    })
  }
})
    alert('Account updated')
}






function requestAnalysis(){
    var applink = search.value
    var companyIn = company.value
    token = {
      applink: search.value
    }
    jQuery.ajax({
    url: "/checkWebsite",
    type: "POST",
    data:token,
    success: function (data) {
      if(data == false){
        alert("Please enter the application link, we couldn't find resolve the host: "+search.value)
      }
      else if(search.value.length > 0 && company.value.length > 0){
        //were good
        firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var search = applink
        var company = document.getElementById("company")
        var queueItem = {
        company: companyIn,
        website: applink,
        timestamp: Date.now(),
        title: "needTitle"
        }
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          jQuery.ajax({
          url: "/requestAnalysis/"+user.uid,
          type: "POST",
          data:queueItem,
          success: function (data) {
            if(data == "SUCCESS"){
              alert("Application submitted for analysis!")
            }else{

            }

            }
          });
        })
        //alert("Submitted link!")
      }
    });
    }
      else if(search.value.length == 0){
        alert('Enter application link')
      }
      else if(company.value.length == 0){
        alert('Enter company')
      }
      search.value = ""
      company.value = ""


      }
    });

}

function openWebsite(site){

  window.open(site);
}


function startModal(){
   modal = document.getElementById("modal").classList.add('is-active')
   modal.classList.toggle('is-active')
}

function endModal(){
  modal = document.getElementById("modal")
  modal.classList.toggle("is-active")
}

function startForgot(){
   forgot = document.getElementById("forgot").classList.add('is-active')
   forgot.classList.toggle('is-active')
}

function endForgot(){
  forgot = document.getElementById("forgot")
  forgot.classList.toggle("is-active")
}

function sendFeedback(){
  feedback = document.getElementById("feedback").value
  if(feedback.length > 0){
  feed = {
    feedback: feedback
  }
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      jQuery.ajax({
      url: "/postFeedback/"+user.uid,
      type: "POST",
      data:feed,
      success: function (data) {

        }
      });
    })
}
else {
 // No user is signed in.
 alert('Please login to give feedback')
 redirectLogin()
}
})
}  else{
    alert("Please enter feedback")
  }

    endModal()
  }


function forgotPassword(){
  var auth = firebase.auth();
var emailAddress = document.getElementById("forgot_input").value;
auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
  alert('Email sent. Please check your inbox for instructions on resetting your password')
  endForgot()
}).catch(function(error) {
  // An error happened.
  alert(error)
  endForgot()
});
}

function addScroll(){
  var ab = $(".downloadButton")
  ab.click(function() {
    $('html,body').animate({
        scrollTop: $("#analysis").offset().top},
        'slow');
});
}

function scrollToStats(){
  $('html,body').animate({
      scrollTop: $("#stats").offset().top},
      'slow');
}
function scrollToShine(){
  $('html,body').animate({
      scrollTop: $("#shine").offset().top},
      'slow');
}
function scrollToFeedback(){
  $('html,body').animate({
      scrollTop: $("#feedbackIn").offset().top},
      'slow');
}
function scrollToOptimize(){
  $('html,body').animate({
      scrollTop: $("#optimize").offset().top},
      'slow');
}
function scrollToRank(){
  $('html,body').animate({
      scrollTop: $("#rank").offset().top},
      'slow');
}
function scrollToGetStarted(){
  $('html,body').animate({
      scrollTop: $("#start").offset().top},
      'slow');
}
function startSentimentModal(){
  eula = document.getElementById("eula").classList.add('is-active')
  eula.classList.toggle('is-active')
}
function endSentimentModal(){
  eula = document.getElementById("eula")
  eula.classList.toggle("is-active")
}
function getDonation(){
  return 999
}

function coverPopup(){
  alert('uploaded cover')
}
function resumePopup(){
  alert('uploaded resume')
}

function getRecommendedJobs(){
  //alert("Hit Get Recommendations")
  firebase.database().ref('/Recommend/').once('value').then(function(snapshot) {
      var listOfItems = snapshot.val()
      var title_rec = document.getElementById("rec_1_title")
      var sub_rec = document.getElementById("rec_1_subtitle")
      title_rec.innerHTML = listOfItems[0][0]
      sub_rec.innerHTML = "Tier "+listOfItems[0][1]+" Similarity"

      var title_rec_2 = document.getElementById("rec_2_title")
      var sub_rec_2 = document.getElementById("rec_2_subtitle")
      title_rec_2.innerHTML = listOfItems[1][0]
      sub_rec_2.innerHTML = "Tier "+listOfItems[1][1]+" Similarity"

      var title_rec_3 = document.getElementById("rec_3_title")
      var sub_rec_3 = document.getElementById("rec_3_subtitle")
      title_rec_3.innerHTML = listOfItems[2][0]
      sub_rec_3.innerHTML = "Tier "+listOfItems[2][1]+" Similarity"

      var title_rec_4 = document.getElementById("rec_4_title")
      var sub_rec_4 = document.getElementById("rec_4_subtitle")
      title_rec_4.innerHTML = listOfItems[3][0]
      sub_rec_4.innerHTML = "Tier "+listOfItems[3][1]+" Similarity"

      var title_rec_5 = document.getElementById("rec_5_title")
      var sub_rec_5 = document.getElementById("rec_5_subtitle")
      title_rec_5.innerHTML = listOfItems[4][0]
      sub_rec_5.innerHTML = "Tier "+listOfItems[4][1]+" Similarity"
  });
}
