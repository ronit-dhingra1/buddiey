from flask import Blueprint, render_template, redirect
from functools import wraps 

main = Blueprint('main', __name__)


def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
      return f(*args, **kwargs)
    else:
      return redirect('/')
  
  return wrap


# Entry point of application
@main.route('/')
def entry_point():
    return render_template('index.html')

@main.route('/chat/')
@login_required
def chat():
    return render_template('chat.html')

@main.route('/signup')
def signup():
    return render_template('signup.html')

# Website Error Messages
@main.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@main.errorhandler(403)
def forbidden_access(e):
    return render_template('403.html'), 403

@main.route ('/user/signin', methods=['POST'])
def signin():
    return User().signin()

@main.route ('/user/signout')
def signout():
    return User().signout()
  
@main.route ('/user/signup', methods=['POST'])
def signup_user():
    return User().signup()