

from flask import Blueprint, request, jsonify
import requests
from flask_login import current_user, login_required
from ..models import db, Cocktail, CocktailIngredient, Ingredient
from ..forms.cocktail_form import CocktailForm

cocktail_routes = Blueprint('cocktail', __name__)

API_KEY = 'C7xdP9IdRuVAuUiGdsVKAA==gY0JRbhCCKum8qUU'
API_URL = 'https://api.api-ninjas.com/v1/cocktail'

@cocktail_routes.route('/cocktail', methods=['GET'])
def get_cocktail():
    name = request.args.get('name')
    ingredients = request.args.get('ingredients')
    params = {}

    if name:
        params['name'] = name
    if ingredients:
        params['ingredients'] = ingredients

    response = requests.get(API_URL, headers={'X-Api-Key': API_KEY}, params=params)
    
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": response.status_code, "message": response.text}), response.status_code

@cocktail_routes.route('/cocktail', methods=['POST'])
@login_required
def create_cocktail():
    form = CocktailForm()
    if form.validate_on_submit():
        name = form.name.data
        description = form.description.data
        instructions = form.instructions.data
        ingredients_data = form.ingredients.data

        cocktail = Cocktail(
            name=name,
            description=description,
            instructions=instructions,
            created_by=current_user.id
        )

        db.session.add(cocktail)
        db.session.commit()

        for ingredient_data in ingredients_data:
            ingredient_name = ingredient_data['name']
            amount = ingredient_data['amount']
            unit = ingredient_data['unit']

            ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
            if not ingredient:
                ingredient = Ingredient(name=ingredient_name)
                db.session.add(ingredient)
                db.session.commit()

            cocktail_ingredient = CocktailIngredient(
                cocktail_id=cocktail.id,
                ingredient_id=ingredient.id,
                amount=amount,
                unit=unit
            )
            db.session.add(cocktail_ingredient)

        db.session.commit()

        return jsonify(cocktail.to_dict()), 201
    else:
        return jsonify({'errors': form.errors}), 400
