from app.models import db, Ingredient, environment, SCHEMA
from sqlalchemy.sql import text

def seed_ingredients():
    ingredients = [
        Ingredient(name='Vodka'),
        Ingredient(name='Orange Juice'),
        Ingredient(name='Cranberry Juice'),
        Ingredient(name='Gin'),
        Ingredient(name='Tonic Water'),
        Ingredient(name='Rum'),
        Ingredient(name='Coca-Cola'),
        Ingredient(name='Tequila'),
        Ingredient(name='Lime Juice'),
        Ingredient(name='Triple Sec'),
        Ingredient(name='Mint Leaves'),
        Ingredient(name='Sugar Syrup'),
        Ingredient(name='Lemon Juice'),
        Ingredient(name='Whiskey'),
        Ingredient(name='Sweet Vermouth'),
        Ingredient(name='Campari'),
        Ingredient(name='Club Soda'),
        Ingredient(name='Angostura Bitters'),
        Ingredient(name='Ginger Beer'),
        Ingredient(name='Pineapple Juice'),
        Ingredient(name='Coconut Cream'),
        Ingredient(name='Blue Curacao'),
        Ingredient(name='Prosecco'),
        Ingredient(name='Raspberry Syrup'),
        Ingredient(name='Strawberry Puree'),
        Ingredient(name='Grenadine'),
        Ingredient(name='Coffee Liqueur'),
        Ingredient(name='Baileys Irish Cream'),
        Ingredient(name='Amaretto'),
        Ingredient(name='Peach Schnapps'),
        Ingredient(name='Sugar Syrup'),
        Ingredient(name='Water')
    ]

    for ingredient in ingredients:
        db.session.add(ingredient)

    db.session.commit()

def undo_ingredients():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ingredients"))
        
    db.session.commit()
