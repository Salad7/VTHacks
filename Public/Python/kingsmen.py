import webbrowser
import pyautogui
import time
import os
import sys
import pyrebase

#1min 7secs
url = sys.argv[8]

if len(sys.argv) > 0:
    cv2 = sys.argv[1]
    cv1 = sys.argv[2]
    email = sys.argv[3]
    fName = sys.argv[4]
    lName = sys.argv[5]
    phone = sys.argv[7]
    password = sys.argv[6]
    site = sys.argv[8]

def openDevTools():
    time.sleep(2)
    pyautogui.keyDown('F12')
    pyautogui.keyUp('F12')
    time.sleep(1)

def apply_():
    email = sys.argv[3]
    #print(email)
    fName = sys.argv[4]
    #print(fName)
    lName = sys.argv[5]
    #print(lName)
    phone = sys.argv[7]
    address = "2301 Jordi Way"
    city = "Charlotte"
    _zip = "28213"
    state = "32"
    country = "United States"
    visa = "3"
    refer = "13"
    whenGraduate = "1"
    desiredPay = "18.50"
    dateAvail = "01012018"
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("applicant[firstName]")[0].setAttribute("value","'+fName+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("applicant[lastName]")[0].setAttribute("value","'+lName+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("applicant[phone]")[0].setAttribute("value","'+phone+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("applicant[email]")[0].setAttribute("value","'+email+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("location[addressLine1]")[0].setAttribute("value","'+address+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("location[city]")[0].setAttribute("value","'+city+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("location[zipcode]")[0].setAttribute("value","'+_zip+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('$("select")[0].options.selectedIndex = "'+state+'"')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByClassName("chzn-allow-deselect")[1].innerHTML = "'+country+'"')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("positionApplicant[desiredSalary]")[0].setAttribute("value","'+desiredPay+'")')
    pyautogui.keyDown('enter')
    pyautogui.typewrite('document.getElementsByName("applicant[availableYmd]")[0].value = "'+dateAvail+'"')
    pyautogui.keyDown('enter')
    time.sleep(1)

def openResume():
    time.sleep(1)
    pyautogui.typewrite("eventFire($('input')[13].click())")
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.click(920,20)
    pyautogui.typewrite("resume.pdf")
    time.sleep(1)
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.click(976,50)
    time.sleep(1)
    pyautogui.click(480,80)
    time.sleep(1)
    pyautogui.click(470,150)
    time.sleep(1)
    pyautogui.typewrite("resume.pdf")
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.click(530,130)
    time.sleep(1)
    pyautogui.click(960,355)
    time.sleep(1)

def openCover():
    time.sleep(1)
    x, y = pyautogui.center(pyautogui.locateOnScreen('Python/opRedventures/redventuresaddeducationbtn.png'))
    pyautogui.click(x/2,y/2)
    time.sleep(1)
    pyautogui.click(x/2,(y/2)+40)
    cv2 = sys.argv[1]
    cv1 = sys.argv[2]
    pyautogui.typewrite(cv1+" "+cv2)
    time.sleep(1)


config = {
  # Initialize Firebase
  # TODO: Replace with your project's customized code snippet
    "apiKey": "AIzaSyD5m4M9WxvtSzXoLJwE0HCNBa10542IN-g",
    "authDomain": "app-l-133e5.firebaseapp.com",
    "databaseURL": "https://app-l-133e5.firebaseio.com",
    "projectId": "app-l-133e5",
    "storageBucket": "app-l-133e5.appspot.com",
    "messagingSenderId": "939170253210"
  };
firebase = pyrebase.initialize_app(config)
db = firebase.database().child("Queue")
#print("Removing " + sys.argv[9])
storage = firebase.storage()
print(storage)
storage.child("Resume/msalad.pdf").download("resume.pdf")
chrome_path = 'open -a /Applications/Google\ Chrome.app %s'
webbrowser.get(chrome_path).open(url)
time.sleep(1)
openDevTools()
pyautogui.typewrite("function eventFire(el, etype){ if (el.fireEvent) { el.fireEvent('on' + etype);} else {var evObj = document.createEvent('Events');evObj.initEvent(etype, true, false);el.dispatchEvent(evObj);}}")
pyautogui.keyDown('enter')
time.sleep(1)
pyautogui.typewrite("eventFire(document.getElementsByClassName('btn btnLarge btnAction js-jobs-action noCaps')[0], 'click')");
pyautogui.keyDown('enter')
apply_()
openResume()
pyautogui.typewrite("eventFire(document.getElementsByClassName('btn btnLarge btnAction js-jobs-submit-application addProcessing')[0], 'click')")
pyautogui.keyDown('enter')
db.child(sys.argv[9]).remove()
