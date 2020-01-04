import numbers
"""
    define attributes / variables
        number
        string
        boolean
        array
        dictionary / objects
        undefined
    sample if / else
    functions
        parameters
        returns
    arrays
        add to the front
        add to the end
        update values
    loops 
        for
        for/in
        while
        do while
        forEach (with array and function)
    Objects / Dictionaries
        declare object
        lookup key to retrieve value
"""
class UseTypeException(Exception):
    def __init__(self, input, valid_type):
        message = f"{input} is not of {valid_type}"
        super().__init__(message)


def add(x, y):
    return x+y

def subtract(from_num, num):
    return from_num - num

def divide(num, divisor):
    return num/divisor

def multiply(num1,num2):
    return num1 * num2

def stringLen(string):
    if type(string) is str: 
        return len(string)
    raise UseTypeException(string, str) 

def ifGreaterThanFive(num):
    if isinstance(num, numbers.Number):
        return num > 5
    raise UseTypeException(num, numbers.Number)

def toggle_true_false(t_or_f):
    return not t_or_f

# have to initialize a variable when it's declared
def var_declare_init():
    try: 
        print(f"Trying to print a variable not initialized: {no_init_val_assgined}")
    except NameError as e:
        print(f"Trying to print a variable not initialized will "
              f"give a NameError saying: {e}")

# None will be returned if no specified return in a function:
def return_none():
    print(f"I'm the function that has no return")

def print_return(fn):
    print(f"The return value of {fn} is: |{fn()}|, its type is {type(fn())}")

# add item to front of the array
def list_add_to_front(item, target_list):
    if type(target_list) is list:
        return target_list.insert(0,item)
    raise UseTypeException(target_list, list)

# update the value of an array item at given index (destructive)
def mutate_list_at_idx(idx, target_list, new_val):
    if type(target_list) is list:
        if idx < len(target_list):
            target_list.remove(target_list[idx])
            target_list.insert(idx, new_val)
        else:
            target_list.append(new_val)
        return target_list
    raise UseTypeException(target_list, list)

# convert list to string
def list_to_string(target_list):
    if type(target_list) is list:
        return target_list.__str__()
    raise UseTypeException(target_list, list)

# for...in... loop
def print_dict_prop(dict):
    return [ f" -> key: {key} value: {value}" for key,value in dict.items()]

# while loop
def while_loop(list1, list2):
    concat = zip(list1,list2)
    next_one = concat.__next__()
    try: 
        while(isinstance(next_one, tuple)):
            print(f"items: {next_one}")
            next_one = concat.__next__()
    except StopIteration:
        return



