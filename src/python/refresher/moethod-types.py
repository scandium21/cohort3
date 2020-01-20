class ClassTest:
    def instance_method(self):
        print(f'Called instance_method of {self}')

    @classmethod
    def class_method(cls):
        print(f'Called class_method of {cls}')

    @staticmethod
    def static_method():
        print('Called static_method')


test = ClassTest()
test.instance_method()
# Called instance_method of <__main__.ClassTest object at 0x01B4CB08>
ClassTest.class_method()
# Called class_method of <class '__main__.ClassTest'>
ClassTest.static_method()
# Called static_method

# ---------------------------------------


class Book:
    TYPES = ('hardcover', 'paperback')

    def __init__(self, name, book_type, weight):
        self.name = name
        self.book_type = book_type
        self.weight = weight

    def __repr__(self):
        return f'<Book ({self.name}, {self.book_type}, {self.weight})>'

    @classmethod
    def hardcover(cls, name, page_weight):
        return cls(name, cls.TYPES[0], page_weight + 100)

    @classmethod
    def papercover(cls, name, page_weight):
        return cls(name, cls.TYPES[1], page_weight)


print(Book.TYPES)
# ('hardcover', 'paperback')

book1 = Book.hardcover('HP', 1500)
book2 = Book.papercover('HP2', 1500)
print(book1, book2)

# ------------------------------------------------


# code practice
class Store:
    def __init__(self, name):
        self.name = name
        self.items = []

    def add_item(self, name, price):
        self.items.append({'name': name, 'price': price})

    def stock_price(self):
        total = 0
        for item in self.items:
            total += item['price']
        return total

    @classmethod
    def franchise(cls, store):
        # Return another store, with the same name as the argument's name, plus " - franchise"
        return cls(store.name + ' - franchise')

    @staticmethod
    def store_details(store):
        # Return a string representing the argument
        # It should be in the format 'NAME, total stock price: TOTAL'
        return f'{store.name}, total stock price: {store.stock_price()}'


store = Store('Apple')
store.add_item('airpods', 160)
print(Store.store_details(store))