import pyrebase
import os
import time

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
db = firebase.database()
def stream_handler(message):
    if db.child("ResumeQueue").get().val():
        all_users = db.child("Queue").get()
        for user in all_users.each():
            resumeLink = user.val()["resumeLink"]
            website = user.val()["website"]
            user = user.val()["user"]
            root = user.val()["root"]
            deleteItem(user.key())


def deleteItem(key):
    db.child("Queue").child(key).remove()

def test():
    all_users = db.child("Queue").get()
    for user in all_users.each():
        print(user.key()) # {name": "Mortimer 'Morty' Smith"}
if(1==1):
    stream = db.stream(stream_handler,None)
    #test()
