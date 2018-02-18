import webbrowser
import pyautogui
import time
import os
import sys
import pyrebase

#Benchmarked at 42 seconds
url = sys.argv[8]

if len(sys.argv) > 0:
    #print(sys.argv)
    cv2 = sys.argv[1]
    cv1 = sys.argv[2]
    email = sys.argv[3]
    fName = sys.argv[4]
    lName = sys.argv[5]
    phone = sys.argv[7]
    password = sys.argv[6]
    site = sys.argv[8]
    #print(site)
    #print(phone)

def openDevTools():
    pyautogui.keyDown('F12')
    pyautogui.keyUp('F12')

def applyReddit():
    email = sys.argv[3]
    #print(email)
    fName = sys.argv[4]
    #print(fName)
    lName = sys.argv[5]
    #print(lName)
    phone = sys.argv[7]
    #print(phone)
    #time.sleep(3)
    pyautogui.typewrite('document.getElementById("first_name").setAttribute("value","'+fName+'")')
    pyautogui.keyDown('enter')
    pyautogui.typewrite('document.getElementById("last_name").setAttribute("value","'+lName+'")')
    pyautogui.keyDown('enter')
    pyautogui.typewrite('document.getElementById("phone").setAttribute("value","'+phone+'")')
    pyautogui.keyDown('enter')
    pyautogui.typewrite('document.getElementById("email").setAttribute("value","'+email+'")')
    pyautogui.keyDown('enter')


def openResume():
    time.sleep(1)
    pyautogui.typewrite("eventFire($('a')[9].click())")
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
    pyautogui.typewrite("eventFire($('a')[18], 'click')")
    pyautogui.keyDown('enter')
    pyautogui.typewrite('$("textarea")[1].value = "'+cv1+''+cv2+'"')
    pyautogui.keyDown('enter')
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
#db.child(sys.argv[9]).remove()
storage = firebase.storage()
print(storage)
storage.child("Resume/msalad.pdf").download("msalad.pdf")
# # MacOS
chrome_path = 'open -a /Applications/Google\ Chrome.app %s'
webbrowser.get(chrome_path).open(url)
time.sleep(1)
openDevTools()
time.sleep(1)
pyautogui.typewrite("function eventFire(el, etype){ if (el.fireEvent) { el.fireEvent('on' + etype);} else {var evObj = document.createEvent('Events');evObj.initEvent(etype, true, false);el.dispatchEvent(evObj);}}")
pyautogui.keyDown('enter')
time.sleep(1)
applyReddit()
openResume()
openCover()
openDevTools()
openDevTools()
time.sleep(1)
pyautogui.typewrite("eventFire(document.getElementById('submit_app'), 'click')");
pyautogui.keyDown('enter')
