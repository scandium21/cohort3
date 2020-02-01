import re
from read_data import map_wb_to_dict

wb_dict = map_wb_to_dict()


class IidError(Exception):
    def __init__(self, input, iid_range):
        message = f"{input} is not valid. Please enter integers ranging from 1 to {iid_range}!"
        super().__init__(message)


def get_user_input(iid_range):
    iid = input('Please enter an invoice id to print: ')
    # using regex to check if user input is valid integer
    integer_re = re.compile('[0-9]+$')
    if integer_re.match(iid):
        return int(iid)
    else:
        raise IidError(iid, iid_range)


def get_iid_range(db=wb_dict):
    return wb_dict['invoices'][-1]["i_id"]


def get_cid_from_iid(iid):
    # find record containg iid
    for item in wb_dict["invoices"]:
        if item['i_id'] == iid:
            return item['c_id']
    return "no c_id found"


def get_invoice_date_from_iid(iid):
    for item in wb_dict["invoices"]:
        if item['i_id'] == iid:
            return item['date']
    return "no record found"


def get_customer_names(cid, db=wb_dict):
    for item in wb_dict["customers"]:
        if item['c_id'] == cid:
            return [item['f_name'], item['l_name']]
    return "no customer found"


def get_pid_quantity_from_iid(iid):
    pids = []
    quantity = []
    for item in wb_dict["invoice_details"]:
        if item['i_id'] == iid:
            pids.append(item['p_id'])
            quantity.append(item['quantity'])
    return [pids, quantity]


def get_products_price_from_pid(pids):
    products = []
    price = []
    for item in wb_dict["products"]:
        if pids.count(item['p_id']) != 0:
            products.append(item['name'])
            price.append(item['unit_price'])
    return [products, price]


def get_invoice_content():
    iid = get_user_input(get_iid_range())
    if iid > get_iid_range():
        return {}
    cid = get_cid_from_iid(iid)
    if cid == 'no c_id found':
        return {}
    invoice_date = get_invoice_date_from_iid(iid)
    [firstname, lastname] = get_customer_names(cid)
    [pids, quantity] = get_pid_quantity_from_iid(iid)
    [products, prices] = get_products_price_from_pid(pids)
    return {
        "i_id": iid,
        "f_name": firstname,
        "l_name": lastname,
        "date": invoice_date,
        "amount": prices,
        "product": products,
        "quantity": quantity
    }


def print_invoice(obj):
    s = 15
    l = 25
    string = f'-------------------------------------  Invoice -------------------------------------\n\n'
    string += 'First Name'.ljust(s) + 'Last Name'.ljust(s) + 'Date'.ljust(
        s) + 'Amount ($)'.ljust(s) + 'Product'.ljust(l) + 'Quantity'.ljust(
            s) + '\n'
    for product, amount, quantity in zip(obj["product"], obj["amount"],
                                         obj["quantity"]):
        string += obj["f_name"].ljust(s) + obj["l_name"].ljust(
            s) + obj["date"].ljust(s) + str(amount).ljust(s) + str(
                product).ljust(l) + str(quantity).ljust(s) + '\n'
    return string + '\n\n'


print(print_invoice(get_invoice_content()))

# -------------------------------------  Invoice -------------------------------------

# First Name     Last Name      Date           Amount ($)     Product                  Quantity
# Allen          Butterfield    2019-03-02     500            Cardio II                1
# Allen          Butterfield    2019-03-02     500            Strength Training II     1