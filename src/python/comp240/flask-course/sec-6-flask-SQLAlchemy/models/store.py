from db import db


class StoreModel(db.Model):
    # specify the table name
    __tablename__ = "stores"

    # specify the column in db, must match with member variables in class
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    # back reference
    # a list of items having the store_id
    # this relationship is created as soon as a StoreModel is created
    # can be expensive, creating all items of that id
    # --> use lazy='dynamic'
    # self.items now is a query builder that can look into the items table
    items = db.relationship("ItemModel", lazy="dynamic")

    def __init__(self, name):
        self.name = name

    # return a json representation of a model
    def json(self):
        return {"name": self.name, "items": [item.json() for item in self.items.all()]}

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
