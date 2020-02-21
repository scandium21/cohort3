from flask_restful import Resource, reqparse, inputs
from flask_jwt import jwt_required
from models.invoice import InvoiceModel
from admin_required import admin_required


class Invoice(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "created_at",
        type=inputs.date,
        required=True,
        help="Must contain created_at info!",
    )
    parser.add_argument(
        "total_payment", type=float, required=True, help="Must have total_payment info!"
    )

    def get(self, iid):
        invoice = InvoiceModel.get_by_id(iid)
        if invoice:
            return invoice.json()
        return {"message": "Invoice not found"}, 404
