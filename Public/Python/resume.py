# import webbrowser
# import pyautogui
# import time
# import os
# import sys
# import pyrebase
#
# #1min 7secs
# url = sys.argv[8]
#
# if len(sys.argv) > 0:
#     cv2 = sys.argv[1]
#     cv1 = sys.argv[2]
#     email = sys.argv[3]
#     fName = sys.argv[4]
#     lName = sys.argv[5]
#     phone = sys.argv[7]
#     password = sys.argv[6]
#     site = sys.argv[8]
#
# def openDevTools():
#     time.sleep(2)
#     pyautogui.keyDown('F12')
#     pyautogui.keyUp('F12')
#     time.sleep(1)
#
#
# def openResume():
#     time.sleep(1)
#     pyautogui.typewrite("eventFire($('input')[13].click())")
#     pyautogui.keyDown('enter')
#     time.sleep(1)
#     pyautogui.click(920,20)
#     pyautogui.typewrite("resume.pdf")
#     time.sleep(1)
#     pyautogui.keyDown('enter')
#     time.sleep(1)
#     pyautogui.click(976,50)
#     time.sleep(1)
#     pyautogui.click(480,80)
#     time.sleep(1)
#     pyautogui.click(470,150)
#     time.sleep(1)
#     pyautogui.typewrite("resume.pdf")
#     pyautogui.keyDown('enter')
#     time.sleep(1)
#     pyautogui.click(530,130)
#     time.sleep(1)
#     pyautogui.click(960,355)
#     time.sleep(1)
#
# def openCover():
#     time.sleep(1)
#     x, y = pyautogui.center(pyautogui.locateOnScreen('Python/opRedventures/redventuresaddeducationbtn.png'))
#     pyautogui.click(x/2,y/2)
#     time.sleep(1)
#     pyautogui.click(x/2,(y/2)+40)
#     cv2 = sys.argv[1]
#     cv1 = sys.argv[2]
#     pyautogui.typewrite(cv1+" "+cv2)
#     time.sleep(1)
#
#
# config = {
#   # Initialize Firebase
#   # TODO: Replace with your project's customized code snippet
#     "apiKey": "AIzaSyD5m4M9WxvtSzXoLJwE0HCNBa10542IN-g",
#     "authDomain": "app-l-133e5.firebaseapp.com",
#     "databaseURL": "https://app-l-133e5.firebaseio.com",
#     "projectId": "app-l-133e5",
#     "storageBucket": "app-l-133e5.appspot.com",
#     "messagingSenderId": "939170253210"
#   };
# firebase = pyrebase.initialize_app(config)
# db = firebase.database().child("Queue")
# #print("Removing " + sys.argv[9])
# storage = firebase.storage()
# print(storage)
# storage.child("Resume/msalad.pdf").download("resume.pdf")
# chrome_path = 'open -a /Applications/Google\ Chrome.app %s'
# webbrowser.get(chrome_path).open(url)
# time.sleep(1)
# openDevTools()
# pyautogui.typewrite("function eventFire(el, etype){ if (el.fireEvent) { el.fireEvent('on' + etype);} else {var evObj = document.createEvent('Events');evObj.initEvent(etype, true, false);el.dispatchEvent(evObj);}}")
# pyautogui.keyDown('enter')
# time.sleep(3)
#
# apply_()
# openResume()
#!/usr/bin/env python
# coding: utf8
import socket

HOST, PORT = '', 8888

listen_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
listen_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
listen_socket.bind((HOST, PORT))
listen_socket.listen(1)
print 'Serving HTTP on port %s ...' % PORT
while True:
    client_connection, client_address = listen_socket.accept()
    request = client_connection.recv(1024)
    print request

    http_response = """\
HTTP/1.1 200 OK

Hello, World!
"""
    client_connection.sendall(http_response)
    client_connection.close()
