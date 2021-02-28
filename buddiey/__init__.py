from flask import Flask
from .main.path import main
from .extensions import mongo
import os

# yay it's fixed

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='36ybermission30',
    )

    app.config['MONGO_URI'] = "mongodb+srv://ronit:taj529klts@buddieychat.rohd2.mongodb.net/users?retryWrites=true&w=majority"

    mongo.init_app(app)

    app.register_blueprint(main)


    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    return app