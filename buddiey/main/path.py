from flask import Blueprint, render_template, redirect

main = Blueprint('main', __name__)

# Entry point of application
@main.route('/')
def entry_point():
    return redirect("/login")

@main.route('/login')
def login():
    return render_template('index.html')

# Website Error Messages
@main.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

