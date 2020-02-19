from flask import Flask, jsonify, request
from flask_restful import Resource, Api, reqparse
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity,
)

from db import db
from admin_required import admin_required
from read_data import map_wb_to_dict
from security import authenticated

from resources.product import Product, Products

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICTIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)
api = Api(app)

wb = map_wb_to_dict()

# create db
@app.before_first_request
def create_tables():
    db.create_all()


api.add_resource(Product, "/product", "/product/<string:name>")
api.add_resource(Products, "/products")

# @jwt.user_claims_loader
# def add_claims_to_access_token(identity):
#     if identity == "admin":
#         return {"roles": "admin"}
#     else:
#         return {"roles": "member"}


# @app.route("/login", methods=["POST"])
# def login():
#     if not request.is_json:
#         return jsonify({"msg": "Missing JSON in request"}), 400

#     username = request.json.get("username", None)
#     password = request.json.get("password", None)
#     if not username:
#         return jsonify({"msg": "Missing username parameter"}), 400
#     if not password:
#         return jsonify({"msg": "Missing password parameter"}), 400

#     # if username != 'test' or password != 'test':
#     #     return jsonify({"msg": "Bad username or password"}), 401

#     # Identity can be any data that is json serializable
#     if authenticated(username, password):
#         access_token = create_access_token(identity=username)
#         return jsonify(access_token=access_token), 200
#     return {"message": "wrong combination of username and password"}, 400


# @app.route("/protected", methods=["GET"])
# @admin_required
# def protected():
#     # Access the identity of the current user with get_jwt_identity
#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200


# # GET methods
# @app.route("/members")
# def get_members():
#     return jsonify({"members": wb["customers"]})


# @app.route("/products")
# def get_products():
#     return jsonify({"products": wb["products"]})


# @app.route("/products/<int:id>")
# def get_product_by_id(id):
#     for product in wb["products"]:
#         if product["p_id"] == id:
#             return jsonify(product)
#     return jsonify({"message": "product not found"})


# @app.route("/products/<string:name>")
# def get_product_by_name(name):
#     for product in wb["products"]:
#         if product["name"] == name:
#             return jsonify(product)
#     return jsonify({"message": "product not found"})


# @app.route("/invoices")
# def get_invoices():
#     return jsonify({"invoices": wb["invoices"]})


# @app.route("/invoices/<int:id>")
# def get_invoice_by_id(id):
#     for invoice in wb["invoices"]:
#         if invoice["i_id"] == id:
#             return jsonify(invoice)
#     return jsonify({"message": "product not found"})


# # POST methods
# @app.route("/member", methods=["POST"])
# def create_member():
#     request_data = request.get_json()
#     new_member = {**request_data}
#     wb["customers"].append(new_member)
#     return jsonify(new_member)


# @app.route("/product", methods=["POST"])
# @jwt_required
# def create_product():
#     request_data = request.get_json()
#     new_product = {**request_data}
#     wb["products"].append(new_product)
#     return jsonify(new_product)


if __name__ == "__main__":
    db.init_app(app)
    app.run(port=5000, debug=True)
