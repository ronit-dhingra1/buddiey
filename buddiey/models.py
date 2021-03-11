from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from buddiey.constants import users_db, chat_db, questions
import json
import uuid
import requests
import re

class User:

  def start_session(self, user):
    del user['password']
    session['logged_in'] = True
    session['not_guest'] = True
    session['user'] = user
    return jsonify(user), 200


  def signup(self):
    print(request.form)

    # Create the user object
    user = {
      "_id": uuid.uuid4().hex,
      "first-name": request.form.get('first-name'),
      "last-name": request.form.get('last-name'),
      "email": request.form.get('email'),
      "password": request.form.get('password')
    }

    # Encrypt the password
    user['password'] = pbkdf2_sha256.encrypt(user['password'])

    # Check for existing email address
    if users_db.users.find_one({ "email": user['email'] }):
      return jsonify({ "error": "Email address already in use" }), 400

    if users_db.users.insert_one(user):
      return self.start_session(user)

    return jsonify({ "error": "Signup failed" }), 400
  
  def signout(self):
    session.clear()
    return redirect('/')
  
  def signin(self):

    user = users_db.users.find_one({
      "email": request.form.get('email')
    })

    if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
      return self.start_session(user)
    
    return jsonify({ "error": "Invalid login credentials" }), 401
  
  def send_message(self):
    message = {
      'message': request.form.get('msg')
    }

    count = request.form.get('count')
    resp_msg = questions[0+int(count)]

    # Create the chat object
    chat = {
      "_id": uuid.uuid4().hex,
      "user-msg": request.form.get('user-msg'),
      "buddiey-msg": request.form.get('buddiey-msg'),
      "user": session['user']
    }

    if chat_db.chats.insert_one(chat):
      return jsonify({'resp_msg': resp_msg})
  
    return jsonify({'error': 'Saving to the Database failed'}), 401

  def start(self):
    session.clear()
    return jsonify({'status': 'ok'}), 200
  
  def get_sentiment(self, msg):
    params = {
      'msg': msg
    }
    self.url = 'https://api.buddiey.live'
    sentiment = requests.post(url, params)
    sentiment = json.dumps(sentiment)
    sentiment = json.loads(sentiment)
    return jsonify(sentiment), 200
