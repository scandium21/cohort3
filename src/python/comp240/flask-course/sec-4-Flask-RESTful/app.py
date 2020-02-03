from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_jwt import JWT, jwt_required

from security import authenticate, identity
# Api works with Resource, every Resource has to be a class.
# Flast-JWT: json web token. Obfuscation of data, encoding of data

app = Flask(__name__)
app.secret_key = 'scandium'
api = Api(app)

# JWT creates an endpoint - /auth
# when call /auth, send it a username and a password
# jwt passes them on to authenticate func
# /auth returns a JWT token, the latter doesn't do anything on its own
# but it can be sent to the next request we make
# identity func takes the JWT and returns the corresponding user
jwt = JWT(app, authenticate, identity)

items = []


class Item(Resource):
    parser = reqparse.RequestParser()
    # all args are erased except for "price"
    parser.add_argument('price',
                        type=float,
                        required=True,
                        help="This field cannot be left blank!")
    # parser will parse the args that come through json payload
    # it can also parse the payload of an html form
    # request_data = parser.parse_args()

    @jwt_required()
    def get(self, name):
        item = next(filter(lambda item: item["name"] == name, items), None)
        return {'item': item}, 200 if item is not None else 404

    def post(self, name):
        if next(filter(lambda item: item["name"] == name, items),
                None) is not None:
            return {
                'message': f"an item with name {name} already exists"
            }, 400  # 400 for bad request
        # input for get_json
        # force=True --> does not need content header
        # silent=True --> no error, returns None
        # request_data = request.get_json()
        request_data = Item.parser.parse_args()
        item = {'name': name, 'price': request_data["price"]}
        items.append(item)
        return item, 201

    def delete(self, name):
        # need to specify the global items, otherwise python initializes a local one
        global items
        items = list(filter(lambda x: x['name'] != name, items))
        return {'message': 'item deleted'}

    def put(self, name):
        request_data = Item.parser.parse_args()

        item = next(filter(lambda item: item["name"] == name, items), None)
        if item is None:
            item = {'name': name, 'price': request_data["price"]}
            items.append(item)
        else:
            item.update(request_data)
        return item


class ItemList(Resource):
    def get(self):
        return {"items": items}


api.add_resource(Item, '/item/<string:name>')
api.add_resource(ItemList, '/items')

app.run(port=5000, debug=True)