from flask_restful import Resource, reqparse, inputs
from flask_jwt_extended import jwt_required
from models.customer import CustomerModel
from admin_required import admin_required


class Customer(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "f_name",
        type=str,
        required=True,
        help="Must contain first name info!",
        case_sensitive=False,
    )
    parser.add_argument(
        "l_name",
        type=str,
        required=True,
        help="Must contain last name info!",
        case_sensitive=False,
    )
    parser.add_argument(
        "email",
        type=str,
        required=True,
        help="Must contain email info!",
        case_sensitive=False,
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
        return {"message": "Member not found"}, 404

    def post(self):
        data = Customer.parser.parse_args()
        customer = CustomerModel.find_by_email(data["email"])
        if customer:
            return (
                {"message": f"a member with the same email already exists"},
                400,
            )
        new_customer = CustomerModel(**data)
        try:
            new_customer.save_to_db()
        except:
            return (
                {"message": "An error occured adding a member"},
                500,
            )
        return new_customer.json(), 201

    def delete(self):
        data = Customer.parser.parse_args()
        customer = CustomerModel.find_by_email(data["email"])
        if customer:
            customer.delete_from_db()
            return {"message": "member deleted"}

    def put(self):
        data = Customer.parser.parse_args()
        customer = CustomerModel.find_by_full_name(data["f_name"], data["l_name"])
        if customer:
            customer.email = data["email"]
            customer.active = data["active"]
            customer.created_at = data["created_at"]
        else:
            customer = CustomerModel(**data)
        customer.save_to_db()
        return customer.json()


class Customers(Resource):
    def get(self):
        return {"members": [member.json() for member in CustomerModel.query.all()]}
