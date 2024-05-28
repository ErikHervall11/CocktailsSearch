# app/forms/cocktail_form.py

from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FieldList, FormField, SubmitField
from wtforms.validators import DataRequired


class IngredientForm(FlaskForm):
    name = StringField("Ingredient Name", validators=[DataRequired()])
    amount = StringField("Amount", validators=[DataRequired()])
    unit = StringField("Unit", validators=[DataRequired()])


class CocktailForm(FlaskForm):
    name = StringField("Cocktail Name", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    instructions = TextAreaField("Instructions", validators=[DataRequired()])
    ingredients = FieldList(
        FormField(IngredientForm), min_entries=1, validators=[DataRequired()]
    )
    submit = SubmitField("Create Cocktail")
