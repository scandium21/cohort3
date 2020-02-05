from flask import Flask
from flask_restful import Api
from flask_jwt import JWT

from db import db
from security import authenticate, identity
from resources.user import UserRegister
from resources.item import Item, ItemList

# Api works with Resource, every Resource has to be a class.
# Flast-JWT: json web token. Obfuscation of data, encoding of data

app = Flask(__name__)
# turns off flask sqlalchemy tracker to save resources
# sqlalchemy has its own modificaton tracker
app.config["SQLALCHEMY_TRACK_MODIFICTIONS"] = False
# doen't have to be sqlite, can be postgresql, mySQL ...
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.secret_key = "scandium"
api = Api(app)

# JWT creates an endpoint - /auth
# when call /auth, send it a username and a password
# jwt passes them on to authenticate func
# /auth returns a JWT token, the latter doesn't do anything on its own
# but it can be sent to the next request we make
# identity func takes the JWT and returns the corresponding user
jwt = JWT(app, authenticate, identity)

api.add_resource(Item, "/item/<string:name>")
api.add_resource(ItemList, "/items")
api.add_resource(UserRegister, "/register")

if __name__ == "__main__":
    db.init_app(app)
    app.run(port=5000, debug=True)
