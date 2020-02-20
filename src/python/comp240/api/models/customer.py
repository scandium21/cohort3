from db import db


class CustomerModel(db.Model):
    __tablename__ = "customers"

    c_id = db.Column(db.Integer, primary_key=True)
    f_name = db.Column(db.String(80), nullable=False)
    l_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    active = db.Column(db.Interger)
    created_at = db.Column(db.DateTime, nullable=False)

    def json(self):
        return {
            "f_name": self.f_name,
            "l_name": self.l_name,
            "email": self.email,
            "active": self.active,
            "created_at": self.created_at,
        }

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f"<Customer {self.f_name} {self.l_name}>"

