from .db import db


class CocktailIngredient(db.Model):
    __tablename__ = "cocktail_ingredients"

    id = db.Column(db.Integer, primary_key=True)
    cocktail_id = db.Column(db.Integer, db.ForeignKey("cocktails.id"), nullable=False)
    ingredient_id = db.Column(
        db.Integer, db.ForeignKey("ingredients.id"), nullable=False
    )
    amount = db.Column(db.String(50), nullable=False)
    unit = db.Column(db.String(50), nullable=False)

    cocktail = db.relationship("Cocktail", back_populates="ingredients")
    ingredient = db.relationship("Ingredient", back_populates="cocktails")

    def to_dict(self):
        return {
            "id": self.id,
            "cocktail_id": self.cocktail_id,
            "ingredient_id": self.ingredient_id,
            "amount": self.amount,
            "unit": self.unit,
        }
