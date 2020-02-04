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
            item.insert()
        except:
            return (
                {"message": "An error occured inserting an item"},
                500,
            )  # internal server error
        return item.json(), 201

    def delete(self, name):
        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()
        query = "DELETE FROM items WHERE name=?"
        cursor.execute(query, (name,))

        connection.commit()
        connection.close()
        return {"message": "item deleted"}

    def put(self, name):
        request_data = Item.parser.parse_args()

        item = ItemModel.find_by_name(name)
        updated_item = ItemModel(name, request_data["price"])

        if item is None:
            try:
                updated_item.insert()
            except:
                return {"message": "An error occured inserting an item"}, 500
        else:
            try:
                updated_item.update()
            except:
                return {"message": "An error occured inserting an item"}, 500
        return updated_item.json()


class ItemList(Resource):
    def get(self):
        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()

        query = "SELECT * FROM items"
        result = cursor.execute(query)
        items = []
        for row in result:
            items.append({"name": row[0], "price": row[1]})

        connection.commit()
        connection.close()
        return {"items": items}
