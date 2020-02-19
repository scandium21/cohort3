from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required
from models.product import ProductModel
from admin_required import admin_required


class Product(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "unit_price", type=float, required=True, help="Must contain price info!"
    )
    parser.add_argument("name", type=str, required=True, help="Must have a name!")

    def get(self, name):
        product = ProductModel.find_by_name(name)
        if product:
            return product.json()
        return {"message": "Product not found"}, 404

    # @admin_required
    def post(self):
        data = Product.parser.parse_args()
        if ProductModel.find_by_name(data["name"].lower()):
            return (
                {"message": f"an item with name {data['name'].lower()} already exists"},
                400,
            )
        new_product = ProductModel(data["name"].lower(), data["unit_price"])
        try:
            new_product.save_to_db()
        except:
            return (
                {"message": "An error occured inserting an item"},
                500,
            )
        return new_product.json(), 201

    # @admin_required
    def delete(self):
        data = Product.parser.parse_args()
        product = ProductModel.find_by_name(data["name"].lower())
        if product:
            product.delete_from_db()
            return {"message": "item deleted"}

    # @admin_required
    def put(self):
        data = Product.parser.parse_args()
        product = ProductModel.find_by_name(data["name"].lower())
        if product is None:
            product = ProductModel(data["name"].lower(), data["unit_price"])
        else:
            product.name = data["name"].lower()
            product.unit_price = data["unit_price"]
        product.save_to_db()
        return product.json()


class Products(Resource):
    def get(self):
        return {"products": [product.json() for product in ProductModel.query.all()]}
