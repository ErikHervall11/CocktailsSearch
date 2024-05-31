from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FieldList, FormField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf.file import FileAllowed, FileField, FileRequired
from app.api.AWS_helpers import ALLOWED_EXTENSIONS

class IngredientForm(FlaskForm):
    name = StringField("Ingredient Name", validators=[DataRequired()])
    amount = StringField("Amount", validators=[DataRequired()])
    unit = StringField("Unit", validators=[DataRequired()])

class CocktailForm(FlaskForm):
    name = StringField("Cocktail Name", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    instructions = TextAreaField("Instructions", validators=[DataRequired()])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    ingredients = FieldList(FormField(IngredientForm), min_entries=1, validators=[DataRequired()])
    csrf_token = StringField()
    submit = SubmitField("Create Cocktail")
