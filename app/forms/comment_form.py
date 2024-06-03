
from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    content = TextAreaField('Content', validators=[DataRequired()])
    csrf_token = StringField()
