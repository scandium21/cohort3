# arguments get collected into a tuple and stored in args
def multiply(*args):
    total = 1
    for arg in args:
        total *= arg
    return total


print(multiply(3, 24, 4))  # args = (3,24,4)


# -----------------------------------------------
def add(x, y):
    return x + y


nums = [3, 5]
numsObj = {'x': 4, 'y': 8}
print(add(*nums))
print(add(x=3, y=5))
print(add(**numsObj))

# ------------------------------------------------


def sum(*args):
    s = 0
    for n in args:
        s += n
    return s


def apply(*args, operator):
    if operator == '*':
        return multiply(*args)
    elif operator == "+":
        return sum(*args)
    else:
        return 'No valid operator provided to apply()'


print(apply(1, 2, 3, 5, operator='*'))
print(apply(1, 2, 3, 4, operator='+'))

# ------------------------------------------------------


def named(**kwargs):
    print(kwargs)


named(name='JD', age=33)  # {'name': 'JD', 'age': 33}


def dnamed(name, age):
    print(name, age)


details = {'name': 'KD', 'age': 23}
dnamed(**details)  # KD 23


def print_nicely(**kwargs):
    named(**kwargs)
    for arg, val in kwargs.items():
        print(f"{arg}: {val}")


print_nicely(name='KK', age='19')


def both(*args, **kwargs):
    print(args)
    print(kwargs)


both(2, 4, 5, name='marry', has='a little lamb')

# (2, 4, 5)
# {'name': 'marry', 'has': 'a little lamb'}

# the syntax is used to collect unlimited # of args
"""
def post(url, data=None, json=None, **kwargs):
    return request('post', url, data=data, json=json, **kwargs)
"""
