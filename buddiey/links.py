from flask import Blueprint, render_template, redirect, session
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
        if 'not_guest' in session:
            return f(*args, **kwargs)
        else:
            return redirect('/chat/')
    
    return wrap

# Entry point of application
@path.route('/')
@currently_logged_in
def entry_point():
    return render_template('index.html')

@path.route('/chat/')
@login_required
def chat():
    return render_template('chat.html')

@path.route('/signup')
def signup():
    return render_template('signup.html')

# Website Error Messages
@path.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@path.errorhandler(403)
def forbidden_access(e):
    return render_template('403.html'), 403

@path.route ('/user/signin', methods=['POST'])
def signin():
    return User().signin()

@path.route ('/user/signout')
def signout():
    return User().signout()
  
@path.route ('/user/signup', methods=['POST'])
def signup_user():
    return User().signup()