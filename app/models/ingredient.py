from .db import db
from datetime import datetime

class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)

    cocktails = db.relationship('CocktailIngredient', back_populates='ingredient')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }