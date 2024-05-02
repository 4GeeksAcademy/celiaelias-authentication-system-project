"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/sign_up', methods=['POST'])
def handle_sign_up():
    request_body = request.get_json()

    if not 'email'in request_body:
        return jsonify("Email is required"), 400
    if not 'password'in request_body:
        return jsonify("Password is required"), 400
    
    user = User(email=request_body["email"], password=request_body["password"], is_active=True)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'New user added'}), 200


@api.route('/sign_in', methods=['POST'])
def handle_sign_in():
    request_body = request.get_json()
    email = request_body.get('email')
    password = request_body.get('password')
    if not email or not password:
        return jsonify({'message': 'Email and password are required'})
    user = User.query.filter_by(email = email, password = password).first()
    if not user:
        return jsonify({'message': 'Email and password are incorrect'})
    token = create_access_token(identity = user.id)

    return jsonify({'message': token}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    data = request.json
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id = current_user_id).first()
    if user is None:
        raise APIException('User not found', status_code=404)

    return jsonify('User authenticated'), 200
