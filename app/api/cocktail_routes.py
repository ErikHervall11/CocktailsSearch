from flask import Blueprint, request, jsonify
import requests
from flask_login import current_user, login_required
from app.models import db, Cocktail, CocktailIngredient, Ingredient, Comment
from app.forms.cocktail_form import CocktailForm
from app.api.AWS_helpers import (
    upload_file_to_s3,
    get_unique_filename,
    remove_file_from_s3,
)

cocktail_routes = Blueprint("cocktail", __name__)

API_URL = "https://api.api-ninjas.com/v1/cocktail"
API_KEY = "C7xdP9IdRuVAuUiGdsVKAA==gY0JRbhCCKum8qUU"


@cocktail_routes.route("/search-cocktails", methods=["GET"])
def search_cocktails():
    name = request.args.get("name")
    ingredients = request.args.get("ingredients")
    params = {}

    if name:
        params["name"] = name
    if ingredients:
        params["ingredients"] = ingredients

    response = requests.get(API_URL, headers={"X-Api-Key": API_KEY}, params=params)

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return (
            jsonify({"error": response.status_code, "message": response.text}),
            response.status_code,
        )




@cocktail_routes.route("/cocktails/new", methods=["POST"])
@login_required
def create_cocktail():
    form = CocktailForm()

    if form.validate_on_submit():
        print("Form Validated Successfully")
        name = form.name.data
        description = form.description.data
        instructions = form.instructions.data
        image = form.image.data
        ingredients_data = form.ingredients.data

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return jsonify({"errors": "Failed to upload image"}), 400
            image_url = upload["url"]
        else:
            image_url = None

        cocktail = Cocktail(
            name=name,
            description=description,
            instructions=instructions,
            image_url=image_url,
            created_by=current_user.id,
        )

        db.session.add(cocktail)
        db.session.commit()

        for ingredient_data in ingredients_data:
            ingredient_name = ingredient_data["name"]
            amount = ingredient_data["amount"]
            unit = ingredient_data["unit"]

            ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
            if not ingredient:
                ingredient = Ingredient(name=ingredient_name)
                db.session.add(ingredient)
                db.session.commit()

            cocktail_ingredient = CocktailIngredient(
                cocktail_id=cocktail.id,
                ingredient_id=ingredient.id,
                amount=amount,
                unit=unit,
            )
            db.session.add(cocktail_ingredient)

        db.session.commit()

        return jsonify(cocktail.to_dict()), 201
    else:
        print("Form Errors After Validation:", form.errors)
        return jsonify({"errors": form.errors}), 400
    
###############################################
#############Get all Cocktails################# 
###############################################
@cocktail_routes.route('/cocktails', methods=['GET'])
def get_cocktails():
    cocktails = Cocktail.query.all()
    return jsonify([cocktail.to_dict() for cocktail in cocktails]), 200


###############################################
##########Get a single Cocktail by ID########## 
###############################################

@cocktail_routes.route('/cocktails/<int:id>', methods=['GET'])
def get_cocktail(id):
    cocktail = Cocktail.query.get(id)
    if cocktail:
        return jsonify(cocktail.to_dict()), 200
    else:
        return jsonify({'error': 'Cocktail not found'}), 404
    
    
###############################################
#############Update a Cocktail################# 
###############################################

@cocktail_routes.route('/cocktails/<int:id>', methods=['PUT'])
@login_required
def update_cocktail(id):
    cocktail = Cocktail.query.get(id)
    if not cocktail or cocktail.created_by != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 401

    form = CocktailForm()
    if form.validate_on_submit():
        cocktail.name = form.name.data
        cocktail.description = form.description.data
        cocktail.instructions = form.instructions.data

        if form.image.data:
            image = form.image.data
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" in upload:
                if cocktail.image_url:
                    remove_file_from_s3(cocktail.image_url)
                cocktail.image_url = upload["url"]
        elif 'existing_image_url' in request.form:
            cocktail.image_url = request.form['existing_image_url']

        CocktailIngredient.query.filter_by(cocktail_id=cocktail.id).delete()

        ingredients_data = form.ingredients.data
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
        return jsonify(cocktail.to_dict()), 200
    else:
        return jsonify({'errors': form.errors}), 400
    
    
###############################################
#############Delete a Cocktail################# 
###############################################

@cocktail_routes.route('/cocktails/<int:id>', methods=['DELETE'])
@login_required
def delete_cocktail(id):
    cocktail = Cocktail.query.get(id)
    if not cocktail or cocktail.created_by != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 401

    db.session.delete(cocktail)
    db.session.commit()
    return jsonify({'message': 'Cocktail deleted'}), 200


###############################################
#############Get Comments     ################# 
###############################################


@cocktail_routes.route('/cocktails/<int:id>/comments', methods=['GET'])
def get_comments(id):
    cocktail = Cocktail.query.get(id)
    if not cocktail:
        return jsonify({'error': 'Cocktail not found'}), 404

    comments = Comment.query.filter_by(cocktail_id=id).all()
    return jsonify([comment.to_dict() for comment in comments]), 200

