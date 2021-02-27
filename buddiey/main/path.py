from flask import Blueprint, render_template, redirect

main = Blueprint('main', __name__)

# Entry point of application
@main.route('/')
def entry_point():
    return redirect('/signin')

@main.route('/signin')
def login():
    return render_template('index.html')

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