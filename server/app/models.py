from flask_pymongo import PyMongo

mongo = PyMongo()

class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email

    def save_to_db(self):
        mongo.db.users.insert_one({
            'username': self.username,
            'email': self.email
        })

    @staticmethod
    def get_all_users():
        return mongo.db.users.find()