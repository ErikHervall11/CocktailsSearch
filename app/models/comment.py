
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    cocktail_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cocktails.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='comments')
    cocktail = db.relationship('Cocktail', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'cocktail_id': self.cocktail_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.simple_dict()
        }

    def simple_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'cocktail_id': self.cocktail_id
        }
