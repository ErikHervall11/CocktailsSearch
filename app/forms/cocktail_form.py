from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    TextAreaField,
    FieldList,
    FormField,
    SubmitField,
    FileField,
)
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileAllowed


class IngredientForm(FlaskForm):
    name = StringField("Ingredient Name", validators=[DataRequired()])
    amount = StringField("Amount", validators=[DataRequired()])
    unit = StringField("Unit", validators=[DataRequired()])


class CocktailForm(FlaskForm):
    name = StringField("Cocktail Name", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    instructions = TextAreaField("Instructions", validators=[DataRequired()])
    image = FileField(
        "Cocktail Image", validators=[FileAllowed(["jpg", "png"], "Images only!")]
    )
    ingredients = FieldList(
        FormField(IngredientForm), min_entries=1, validators=[DataRequired()]
    )
    submit = SubmitField("Create Cocktail")

    def validate_image(form, field):
        if field.data and not field.data.filename.lower().endswith(
            (".jpg", ".jpeg", ".png")
        ):
            raise ValidationError(
                "Invalid file type: only jpg, jpeg, and png are allowed."
            )
