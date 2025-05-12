from flask import Blueprint, jsonify, request
from app.models import YourModel  # Replace with your actual model
from app import mongo

bp = Blueprint('routes', __name__)

@bp.route('/api/yourmodel', methods=['GET'])
def get_yourmodel():
    data = mongo.db.yourmodel.find()  # Replace 'yourmodel' with your actual collection name
    return jsonify([item for item in data]), 200

@bp.route('/api/yourmodel', methods=['POST'])
def create_yourmodel():
    new_data = request.json
    mongo.db.yourmodel.insert_one(new_data)  # Replace 'yourmodel' with your actual collection name
    return jsonify(new_data), 201

@bp.route('/api/yourmodel/<id>', methods=['GET'])
def get_yourmodel_by_id(id):
    data = mongo.db.yourmodel.find_one({'_id': id})  # Replace 'yourmodel' with your actual collection name
    if data:
        return jsonify(data), 200
    return jsonify({'error': 'Not found'}), 404

@bp.route('/api/yourmodel/<id>', methods=['DELETE'])
def delete_yourmodel(id):
    result = mongo.db.yourmodel.delete_one({'_id': id})  # Replace 'yourmodel' with your actual collection name
    if result.deleted_count:
        return jsonify({'message': 'Deleted successfully'}), 200
    return jsonify({'error': 'Not found'}), 404