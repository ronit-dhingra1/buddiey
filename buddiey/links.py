from flask import Blueprint, render_template, redirect, session, request
from functools import wraps
from .models import User 

path = Blueprint('main', __name__)


def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
      return f(*args, **kwargs)
    else:
      return redirect('/')
  
  return wrap


def currently_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if session == None:
            return f(*args, **kwargs)
        else:
            return redirect('/chat/')

    return wrap

# Entry point of application
@path.route('/')
def entry_point():
    User().start()
    return render_template('index.html')

@path.route('/chat/')
@login_required
def chat():
    return render_template('chat.html')

@path.route('/signup')
def signup():
    User().start()
    return render_template('signup.html')

# Website Error Messages
@path.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@path.errorhandler(403)
def forbidden_access(e):
    return render_template('403.html'), 403

@path.route('/user/signin', methods=['POST'])
def signin():
    return User().signin()

@path.route('/user/signout')
def signout():
    return User().signout()
  
@path.route('/user/signup', methods=['POST'])
def signup_user():
    return User().signup()

@path.route('/user/chat/send', methods=['POST'])
def send_chat():
    return User().send_message()

@path.route('/user/chat/pass_sentiment', methods=['POST'])
@login_required
def pass_sentiment():
    sentiment = request.args.get('value')
    return jsonify({'sentiment': sentiment}), 200

@path.route('/user/chat/sentiment', methods=['POST'])
def get_sentiment():
    msg = request.form.get('msg-box')
    return User().get_sentiment(msg)