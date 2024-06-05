from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
from flask_wtf.file import FileAllowed, FileField
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = PasswordField('password', validators=[DataRequired(), Length(min=8, message="Password must be at least 8 characters.")])
    first_name = StringField('first_name', validators=[DataRequired()]) 
    last_name = StringField('last_name', validators=[DataRequired()])
    profile_image = FileField('profile_image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))], description="Optional. Default image will be used if not provided.")
