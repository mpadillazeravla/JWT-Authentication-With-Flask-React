"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import json

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#login
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401 
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)   


#ruta protegida
@api.route("/profile", methods=["GET"])
@jwt_required()
def protected():
        current_user = get_jwt_identity()
        user = User.query.filter_by(email=current_user).first()
        return jsonify(user.serialize()) , 200
   

#crear usuario
@api.route("/user", methods=["POST"])
def create_user():
    body = json.loads(request.data)
    print(body)
    user = User(email=body["email"], password=body["password"], is_active=True)
    db.session.add(user)
    db.session.commit()

    response_body={
        "msg": "usuario creado"
    }
    # return jsonify(response_body), 200
    access_token = create_access_token(identity=body["email"])
    return jsonify(access_token=access_token)   