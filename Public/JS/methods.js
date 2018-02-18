function redirectHome(){
  window.location.href = "home.html"
}
function redirectLogin(){
  window.location.href = "login.html"
}
function redirectRegister(){
  window.location.href = "register.html"
}
function redirectAccount(){
  window.location.href = "account.html"
}

function redirectAbout(){
  window.location.href = "index.html"
}
function initLogin(){
  document.getElementById('submit_login')
        .addEventListener('click', login);
}

function httpGetAsync()
{
	var theUrl = "http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=235670&t.k=bgaYTKa89Do&action=employers&q=pharmaceuticals&userip=192.168.43.42&useragent=Mozilla/%2F4.0"
	 var callback = function(response){
		 console.log("Response: "+response)
	 };
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
						console.log(xmlHttp.responseText)
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
		xmlHttp.setRequestHeader( 'Access-Control-Allow-Origin', '*');
		xmlHttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xmlHttp.setRequestHeader('Content-type', 'application/ecmascript');
    xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlHttp.send();
}

// function postData(input) {
//     $.ajax({
//         type: "POST",
//         url: "/Python/resume.py",
//         data: { param: input },
//         success: callbackFunc
//     });
// }
//
// function callbackFunc(response) {
//     // do something with the response
//     console.log(response);
// }
//
// postData('data to process');
