import sqlite3
from flask_restful import Resource, reqparse
from flask_jwt import jwt_required


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
        item = self.find_by_name(name)
        if item:
            return item
        return {"message": "Item not found"}, 404

    @classmethod
    def find_by_name(cls, name):
        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()

        query = "SELECT * FROM items WHERE name=?"
        result = cursor.execute(query, (name,))
        row = result.fetchone()
        connection.close()

        if row:
            return {"item": {"name": row[0], "price": row[1]}}

    def post(self, name):
        if self.find_by_name(name):
            return (
                {"message": f"an item with name {name} already exists"},
                400,
            )  # 400 for bad request
        # input for get_json
        # force=True --> does not need content header
        # silent=True --> no error, returns None
        # request_data = request.get_json()
        request_data = Item.parser.parse_args()
        item = {"name": name, "price": request_data["price"]}
        try:
            self.insert(item)
        except:
            return (
                {"message": "An error occured inserting an item"},
                500,
            )  # internal server error
        return item, 201

    @classmethod
    def insert(cls, item):
        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()
        query = "INSERT INTO items VALUES (?,?)"
        cursor.execute(query, (item["name"], item["price"]))

        connection.commit()
        connection.close()

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

        item = self.find_by_name(name)
        updated_item = {"name": name, "price": request_data["price"]}

        if item is None:
            try:
                self.insert(updated_item)
            except:
                return ({"message": "An error occured inserting an item"},)
                500
        else:
            try:
                self.update(updated_item)
            except:
                return ({"message": "An error occured inserting an item"},)
                500,
        return updated_item

    @classmethod
    def update(cls, item):
        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()

        query = "UPDATE items SET price=? WHERE name=?"
        cursor.execute(query, (item["price"], item["name"]))

        connection.commit()
        connection.close()


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
