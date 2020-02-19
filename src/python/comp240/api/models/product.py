from db import db


class ProductModel(db.Model):
    __tablename__ = "products"

    p_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    unit_price = db.Column(db.Float(precision=2), nullable=False)

    def __init__(self, name, unit_price):
        self.name = name
        self.unit_price = unit_price

    def json(self):
        return {"name": self.name, "unit_price": self.unit_price}

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name.lower()).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f"<Product {self.name}>"

