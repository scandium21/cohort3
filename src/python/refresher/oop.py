student = {'name': 'JC', 'grades': (77, 89, 80, 66, 98)}


def avg(seq):
    return sum(seq) / len(seq)


print(avg(student['grades']))


class Student:
    def __init__(self, name, grades):
        self.name = name
        self.grades = grades

    def average(self):
        return sum(self.grades) / len(self.grades)


jc = Student('JC', (77, 89, 80, 66, 98))
print(jc.average())

# ----------------------------------------------
# __str__ and __repr__


class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f'Perosn {self.name} is {self.age} years old.'

    def __repr__(self):
        return f'<Person({self.name}, {self.age})> '


bob = Person('Bob', 33)
print(bob)

# <__main__.Person object at 0x03B2CAC0>
# Person Bob is 33 years old.


# --------------------------------
# code exercise
class Store:
    def __init__(self, name):
        # You'll need 'name' as an argument to this method.
        # Then, initialise 'self.name' to be the argument, and 'self.items' to be an empty list.
        self.name = name
        self.items = []

    def add_item(self, name, price):
        # Create a dictionary with keys name and price, and append that to self.items.
        self.items.append({'name': name, 'price': price})

    def stock_price(self):
        # Add together all item prices in self.items and return the total.
        return sum([item['price'] for item in self.items])
