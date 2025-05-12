from flask import Flask
from flask_pymongo import PyMongo
import os

app = Flask(__name__)

# Load configuration from environment variables
app.config['MONGO_URI'] = os.getenv('MONGO_URI')

# Initialize MongoDB connection
mongo = PyMongo(app)

from app import routes