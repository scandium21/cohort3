from flask_restful import Resource, reqparse, inputs
from flask_jwt_extended import jwt_required
from models.customer import CustomerModel
from admin_required import admin_required


class Customer(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "f_name", type=str, required=True, help="Must contain first name info!"
    )
    parser.add_argument(
        "l_name", type=str, required=True, help="Must contain last name info!"
    )
    parser.add_argument(
        "email", type=str, required=True, help="Must contain email info!"
    )
    parser.add_argument(
        "active", type=inputs.int_range(0, 1), required=True, help="Must be 0 or 1",
    )
    parser.add_argument(
        "created_at",
        type=inputs.date,
        required=True,
        help="Must contain created_at info!",
    )

    def get(self, name):
        customer = CustomerModel.find_by_name(name)
        if customer:
            return {"member(s)": [c.json() for c in customer]}
        return {"message": "Customer not found"}, 404

    def post(self):
        data = Customer.parser.parse_args()
        customer = CustomerModel.find_by_email(data["email"])
        if customer:
            return (
                {"message": f"a customer with the same email already exists"},
                400,
            )
        new_customer = CustomerModel(**data)
        try:
            new_customer.save_to_db()
        except:
            return (
                {"message": "An error occured inserting an item"},
                500,
            )
        return new_customer.json(), 201


class Customers(Resource):
    def get(self):
        return {"members": [member.json() for member in CustomerModel.query.all()]}
