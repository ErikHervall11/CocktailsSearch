from .db import db, add_prefix_for_prod, environment, SCHEMA
from datetime import datetime
from .comment import Comment

class Cocktail(db.Model):
    __tablename__ = 'cocktails'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    comments = db.relationship('Comment', back_populates='cocktail', cascade='all, delete-orphan')
    creator = db.relationship('User', back_populates='cocktails')
    ingredients = db.relationship('CocktailIngredient', back_populates='cocktail', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='cocktail')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'instructions': self.instructions,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'created_by': self.created_by,
            'ingredients': [ingredient.to_dict() for ingredient in self.ingredients],
            'comments': [comment.to_dict() for comment in self.comments]
        }
        
    def simple_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'instructions': self.instructions,
            'image_url': self.image_url,
            'created_by': self.created_by
        }