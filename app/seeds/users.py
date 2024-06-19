from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',
        first_name='Demo', last_name='User',
        profile_image='https://cocktail-collective.s3.us-west-1.amazonaws.com/bartender.jpg'
    )
    marnie = User(
        username='HeyJude', email='judy@aa.io', password='password',
        first_name='Judy', last_name='Hervall',
        profile_image='https://cocktail-collective.s3.us-west-1.amazonaws.com/bartender.jpg'
    )
    bobbie = User(
        username='Saman', email='saman@aa.io', password='password',
        first_name='Saman', last_name='Razavi',
        profile_image='https://cocktail-collective.s3.us-west-1.amazonaws.com/bartender.jpg'
    )
    john = User(
        username='JohnnyBravo', email='john@aa.io', password='password',
        first_name='John', last_name='Dizon',
        profile_image='https://cocktail-collective.s3.us-west-1.amazonaws.com/bartender.jpg'
    )
    jane = User(
        username='TheRealSlimJaney', email='jane@aa.io', password='password',
        first_name='Jane', last_name='Swingler',
        profile_image='https://cocktail-collective.s3.us-west-1.amazonaws.com/bartender.jpg'
    )
    alice = User(
        username='Ernie', email='ernie@aa.io', password='password',
        first_name='Ernie', last_name='Ernie',
        profile_image='https://cocktail-collective.s3.us-west-1.amazonaws.com/bartender.jpg'
    )
    bob = User(
        username='Bert', email='bert@aa.io', password='password',
        first_name='Bert', last_name='Bert',
        profile_image='https://cocktail-collective.s3.us-west-1.amazonaws.com/bartender.jpg'
    )
    charlie = User(
        username='MazinMark', email='mark@aa.io', password='password',
        first_name='Mark', last_name='Bautista',
        profile_image='https://cocktail-collective.s3.us-west-1.amazonaws.com/bartender.jpg'
    )
    dave = User(
        username='MrBlack', email='tyler@aa.io', password='password',
        first_name='Tyler', last_name='Black',
        profile_image='https://cocktail-collective.s3.us-west-1.amazonaws.com/bartender.jpg'
    )
    eve = User(
        username='Jooooosh', email='josh@aa.io', password='password',
        first_name='Josh', last_name='Peterson',
        profile_image='https://cocktail-collective.s3.us-west-1.amazonaws.com/bartender.jpg'
    )

    db.session.add(demo)
    db.session.add(HeyJude)
    db.session.add(Saman)
    db.session.add(JohnnyBranvo)
    db.session.add(TheRealSlimJaney)
    db.session.add(Ernie)
    db.session.add(Bert)
    db.session.add(MazinMark)
    db.session.add(MrBlack)
    db.session.add(Jooooosh)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
