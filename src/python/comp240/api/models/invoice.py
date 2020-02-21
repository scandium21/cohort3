from db import db


class InvoiceModel(db.Model):
    __tablename__ = "invoices"

    i_id = db.Column(db.Integer, primary_key=True)
    c_id = db.Column(db.Integer, db.ForeignKey("customers.c_id"))
    created_at = db.Column(db.DateTime, nullable=False)
    total_payment = db.Column(db.Float(precision=2), nullable=False)

    member = db.relationship("CustomerModel")

    def json(self):
        return {
            "created_at": self.created_at.strftime("%Y-%m-%d"),
            "total_payment": self.total_payment,
        }

    @classmethod
    def get_by_id(cls, iid):
        return cls.query.get(iid).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
