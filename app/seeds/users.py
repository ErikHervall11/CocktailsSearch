from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',
        first_name='Demo', last_name='User'
    )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password',
        first_name='Marnie', last_name='Smith'
    )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password',
        first_name='Bobbie', last_name='Brown'
    )
    john = User(
        username='john', email='john@aa.io', password='password',
        first_name='John', last_name='Doe'
    )
    jane = User(
        username='jane', email='jane@aa.io', password='password',
        first_name='Jane', last_name='Doe'
    )
    alice = User(
        username='alice', email='alice@aa.io', password='password',
        first_name='Alice', last_name='Wonderland'
    )
    bob = User(
        username='bob', email='bob@aa.io', password='password',
        first_name='Bob', last_name='Builder'
    )
    charlie = User(
        username='charlie', email='charlie@aa.io', password='password',
        first_name='Charlie', last_name='Brown'
    )
    dave = User(
        username='dave', email='dave@aa.io', password='password',
        first_name='Dave', last_name='Johnson'
    )
    eve = User(
        username='eve', email='eve@aa.io', password='password',
        first_name='Eve', last_name='Smith'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(john)
    db.session.add(jane)
    db.session.add(alice)
    db.session.add(bob)
    db.session.add(charlie)
    db.session.add(dave)
    db.session.add(eve)
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
