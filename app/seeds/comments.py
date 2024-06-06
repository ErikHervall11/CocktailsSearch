from app.models import db, Comment, environment, SCHEMA, Cocktail, User
from sqlalchemy.sql import text

def seed_comments():
    comments = [
        Comment(user_id=1, cocktail_id=2, content="This is a great cocktail!"),
        Comment(user_id=2, cocktail_id=3, content="I loved this recipe!"),
        Comment(user_id=3, cocktail_id=1, content="Perfect drink for a party."),
        Comment(user_id=4, cocktail_id=5, content="Easy to make and delicious."),
        Comment(user_id=5, cocktail_id=2, content="This is my favorite cocktail."),
        Comment(user_id=6, cocktail_id=1, content="Loved it! Will make it again."),
        Comment(user_id=7, cocktail_id=3, content="Refreshing and tasty."),
        Comment(user_id=8, cocktail_id=4, content="A bit too strong for my taste."),
        Comment(user_id=9, cocktail_id=2, content="Classic cocktail done right."),
        Comment(user_id=10, cocktail_id=1, content="Simple and delicious."),
        Comment(user_id=1, cocktail_id=5, content="Great for a hot day."),
        Comment(user_id=2, cocktail_id=4, content="A bit too sweet for me."),
        Comment(user_id=3, cocktail_id=6, content="Perfect balance of flavors."),
        Comment(user_id=4, cocktail_id=7, content="Loved the bitterness."),
        Comment(user_id=5, cocktail_id=8, content="Smooth and tangy."),
        Comment(user_id=6, cocktail_id=9, content="Great cocktail!"),
        Comment(user_id=7, cocktail_id=10, content="Colorful and tasty."),
        Comment(user_id=8, cocktail_id=1, content="Loved the presentation."),
        Comment(user_id=9, cocktail_id=3, content="Exotic and delicious."),
        Comment(user_id=10, cocktail_id=4, content="Will definitely make it again."),
        Comment(user_id=2, cocktail_id=1, content="Really enjoyed this one!"),
        Comment(user_id=3, cocktail_id=2, content="Fantastic cocktail."),
        Comment(user_id=4, cocktail_id=3, content="Absolutely delicious."),
        Comment(user_id=5, cocktail_id=4, content="My new favorite drink."),
        Comment(user_id=6, cocktail_id=5, content="Great blend of flavors."),
        Comment(user_id=7, cocktail_id=6, content="Perfect for summer."),
        Comment(user_id=8, cocktail_id=7, content="Just the right amount of sweetness."),
        Comment(user_id=9, cocktail_id=8, content="Love the tropical flavors."),
        Comment(user_id=10, cocktail_id=9, content="A new classic in my book."),
        Comment(user_id=1, cocktail_id=10, content="Will definitely make this again."),
    ]

    for comment in comments:
        db.session.add(comment)
    
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
