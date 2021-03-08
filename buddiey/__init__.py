from flask import Flask
from functools import wraps
from buddiey import links
import pymongo
import os

app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY='36ybermission30',
    MONGO_URI="mongodb+srv://ronit:taj529klts@buddieychat.rohd2.mongodb.net/users?retryWrites=true&w=majority"
)

client = pymongo.MongoClient('mongodb+srv://ronit:taj529klts@buddieychat.rohd2.mongodb.net/users?retryWrites=true&w=majority')
users_db = client['users']
chat_db = client['chats']

app.register_blueprint(links.path)