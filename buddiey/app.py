from flask import Flask
from functools import wraps
from .main.path import main
import pymongo
from .extensions import mongo
import os

def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
      return f(*args, **kwargs)
    else:
      return redirect('/')
  
  return wrap

app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY='36ybermission30',
    MONGO_URI="mongodb+srv://ronit:taj529klts@buddieychat.rohd2.mongodb.net/users?retryWrites=true&w=majority"
)

mongo.init_app(app)

client = pymongo.MongoClient('mongodb+srv://ronit:taj529klts@buddieychat.rohd2.mongodb.net/users?retryWrites=true&w=majority')
users_db = client.users
chat_db = client.chats

app.register_blueprint(main)