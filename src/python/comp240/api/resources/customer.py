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
        "active", type=inputs.int_range, required=True, help="Must contain active info!"
    )
    parser.add_argument(
        "created_at",
        type=inputs.date,
        required=True,
        help="Must contain created_at info!",
    )

    def get(self):
        data = Customer.parser.parse_args()
        customer = CustomerModel.find_by_name(data["name"])
        if customer:
            return customer
        return {"message": "Customer not found"}, 404

