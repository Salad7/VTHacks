import webbrowser
import pyautogui
import time
import os
import sys
import pyrebase

#Benchmarked at 42 seconds
url = 'https://www.redventures.com/careers/position/763495?gh_jid=763495'

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
    state = "34"
    country = "1"
    visa = "3"
    refer = "13"
    allyReqNum = "17-618"
    whenGraduate = "1"
    pyautogui.typewrite('document.getElementsByName("first_name")[0].setAttribute("value","'+fName+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("last_name")[0].setAttribute("value","'+lName+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("phone")[0].setAttribute("value","'+phone+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("email")[0].setAttribute("value","'+email+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("question_5778357")[0].setAttribute("value","'+address+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("question_5778359")[0].setAttribute("value","'+city+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("question_5778360")[0].setAttribute("value","'+_zip+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("question_5778361")[0].options.selectedIndex = "'+state+'"')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("question_5778362")[0].options.selectedIndex = "'+country+'"')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("question_5778364")[0].options.selectedIndex = "'+visa+'"')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("question_5778365")[0].options.selectedIndex = "'+refer+'"')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("question_5778369")[0].options.selectedIndex = "'+whenGraduate+'"')
    pyautogui.keyDown('enter')
    time.sleep(1)

def searchForPosition;
    pyautogui.typewrite('document.getElementsByName("input-keyword")[0].setAttribute("value","'+allyReqNum+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    #explore jobs
    pyautogui.typewrite('eventFire(document.getElementsByClassName("btn btn-primary btn-icon-right")[0], "click")')
    pyautogui.keyDown('enter')
    time.sleep(5)



def addEducationHistory():
    insitutionType = "3"
    collegeName = "UNC-Charlotte"
    degree = "4"
    focusArea = "Computer Science"
    gpa = "3.50"
    gradDate = "2018-06-08"
    didGraduate = "false"
    pyautogui.typewrite('eventFire(document.getElementsByClassName("fa fa-plus")[0], "click")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('eventFire(document.getElementsByClassName("fa fa-plus")[0], "click")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("educationhistory[1][schoolType]")[0].options.selectedIndex = "'+insitutionType+'"')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("educationhistory[1][otherSchoolText]")[0].setAttribute("value","'+collegeName+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("educationhistory[1][degreeType]")[0].setAttribute("value","'+degree+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("educationhistory[1][focusArea]")[0].setAttribute("value","'+focusArea+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("educationhistory[1][didGraduate]")[1].setAttribute("checked","'+didGraduate+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("educationhistory[1][gpa]")[0].setAttribute("value","'+gpa+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("educationhistory[1][dateAnticipatedGraduation]")[0].setAttribute("value","'+gradDate+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)

def openResume():
    pyautogui.typewrite("eventFire($('"'div input'"')[6].click())")
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.click(920,20)
    pyautogui.typewrite("resume.pdf")
    time.sleep(2)
    pyautogui.click(570,100)
    time.sleep(1)
    pyautogui.click(960,355)

def openCover():
    pyautogui.scroll(50)
    time.sleep(1)
    x, y = pyautogui.center(pyautogui.locateOnScreen('Python/opRedventures/redventuresaddeducationbtn.png'))
    pyautogui.click(x/2,y/2)
    time.sleep(1)
    pyautogui.click(x/2,(y/2)+40)
    cv2 = sys.argv[1]
    cv1 = sys.argv[2]
    pyautogui.typewrite(cv1+" "+cv2)

def register():
    email = sys.argv[3]
    password = sys.argv[6]
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("email")[0].setAttribute("value","'+email+'")')
    pyautogui.keyDown('enter')
    pyautogui.typewrite('document.getElementsByName("password")[0].setAttribute("value","'+password+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('document.getElementsByName("passwordConfirm")[0].setAttribute("value","'+password+'")')
    pyautogui.keyDown('enter')
    time.sleep(1)
    pyautogui.typewrite('eventFire(document.getElementsByClassName("btn btn-primary adp-busy-button")[0], "click")')


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
# # MacOS
chrome_path = 'open -a /Applications/Google\ Chrome.app %s'
webbrowser.get(chrome_path).open(url)
time.sleep(1)
openDevTools()
time.sleep(2)
pyautogui.typewrite("function eventFire(el, etype){ if (el.fireEvent) { el.fireEvent('on' + etype);} else {var evObj = document.createEvent('Events');evObj.initEvent(etype, true, false);el.dispatchEvent(evObj);}}")
pyautogui.keyDown('enter')
searchForPosition()
register()
# time.sleep(1)
# apply_()
# addEducationHistory() #works
# openResume()
# time.sleep(1)
#
#
# pyautogui.typewrite("eventFire(document.getElementById('submitButton'), 'click')");
# pyautogui.keyDown('enter')
# pyautogui.typewrite("eventFire(document.getElementById('submitButton'), 'click')");
# pyautogui.keyDown('enter')
# db.child(sys.argv[9]).remove()
