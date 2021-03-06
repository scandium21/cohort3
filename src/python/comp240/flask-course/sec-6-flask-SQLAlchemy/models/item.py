from db import db

# tell sqlalchemy these are the things will be saving to db
class ItemModel(db.Model):
    # specify the table name
    __tablename__ = "items"

    # specify the column in db, must match with member variables in class
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    price = db.Column(db.Float(precision=2))

    # `db.ForeignKey(<tablename.columnname>)
    store_id = db.Column(db.Integer, db.ForeignKey("stores.id"))
    # sqlalchemy's way of handling join
    # every ItemModel has a property store which matches the store_id
    store = db.relationship("StoreModel")

    def __init__(self, name, price, store_id):
        self.name = name
        self.price = price
        self.store_id = store_id

    # return a json representation of a model
    def json(self):
        return {"name": self.name, "price": self.price}

    @classmethod
    def find_by_name(cls, name):
        # sqlalchemy handles creating the connection and writing queries
        # it converts rows into objects
        # SELECT * FROM items WHERE name=name
        return cls.query.filter_by(name=name).first()  # returns an ItemModel obj

    def save_to_db(self):
        # session is a collection of objects that we're going to write to db
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
