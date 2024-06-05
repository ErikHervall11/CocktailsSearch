from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.AWS_helpers import (
    upload_file_to_s3,
    get_unique_filename,
    remove_file_from_s3,
)

auth_routes = Blueprint('auth', __name__)

DEFAULT_PROFILE_IMAGE_URL = "https://cocktail-collective.s3.us-west-1.amazonaws.com/bartender.jpg"


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout', methods=['POST'])
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():

    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        profile_image = form.profile_image.data
        if profile_image:
            profile_image.filename = get_unique_filename(profile_image.filename)
            upload = upload_file_to_s3(profile_image)
            if "url" not in upload:
                return jsonify({"errors": "Failed to upload image"}), 400
            profile_image_url = upload["url"]
        else:
            profile_image_url = DEFAULT_PROFILE_IMAGE_URL

        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            profile_image=profile_image_url
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return form.errors, 401



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401