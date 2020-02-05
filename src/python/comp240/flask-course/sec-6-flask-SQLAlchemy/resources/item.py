import sqlite3
from flask_restful import Resource, reqparse
from flask_jwt import jwt_required
from models.item import ItemModel


class Item(Resource):
    parser = reqparse.RequestParser()
    # all args are erased except for "price"
    parser.add_argument(
        "price", type=float, required=True, help="This field cannot be left blank!"
    )
    # parser will parse the args that come through json payload
    # it can also parse the payload of an html form
    # request_data = parser.parse_args()

    @jwt_required()
    def get(self, name):
        item = ItemModel.find_by_name(name)
        if item:
            return item.json()
        return {"message": "Item not found"}, 404

    def post(self, name):
        if ItemModel.find_by_name(name):
            return (
                {"message": f"an item with name {name} already exists"},
                400,
            )  # 400 for bad request
        # input for get_json
        # force=True --> does not need content header
        # silent=True --> no error, returns None
        # request_data = request.get_json()
        request_data = Item.parser.parse_args()
        item = ItemModel(name, request_data["price"])
        try:
            item.save_to_db()
        except:
            return (
                {"message": "An error occured inserting an item"},
                500,
            )  # internal server error
        return item.json(), 201

    def delete(self, name):
        item = ItemModel.find_by_name(name)
        if item:
            item.delete_from_db()
            return {"message": "item deleted"}

    def put(self, name):
        request_data = Item.parser.parse_args()

        item = ItemModel.find_by_name(name)

        if item is None:
            item = ItemModel(name, request_data["price"])
        else:
            item["price"] = request_data["price"]
        item.save_to_db()
        return item.json()


class ItemList(Resource):
    def get(self):
        return {"items": [item.json() for item in ItemModel.query.all()]}
