# app/models/favorite.py
from .db import db
from datetime import datetime


class Favorite(db.Model):
    __tablename__ = "favorites"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    cocktail_id = db.Column(db.Integer, db.ForeignKey("cocktails.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="favorites")
    cocktail = db.relationship("Cocktail", back_populates="favorites")
