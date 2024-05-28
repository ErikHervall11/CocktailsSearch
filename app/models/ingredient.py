# app/models/ingredient.py
from .db import db


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)

    cocktails = db.relationship("CocktailIngredient", back_populates="ingredient")
