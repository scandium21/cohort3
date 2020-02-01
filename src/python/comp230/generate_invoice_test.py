import pytest
import json
from generate_invoice import get_user_input, IidError, get_iid_range, get_invoice_content, get_cid_from_iid, get_customer_names, get_invoice_date_from_iid, get_pid_quantity_from_iid, get_products_price_from_pid, print_invoice

test_dict = {
    "Sheet1": [{
        'Color': 'yellow',
        'Fruit': 'banana',
        "id": 1
    }, {
        'Color': 'red',
        'Fruit': 'cherry',
        "id": 2
    }, {
        'Color': 'green',
        'Fruit': 'apple',
        "id": 3
    }],
    "Sheet2": [
        {
            'Holiday': 'Christmas',
            'Date': '2020-12-25'
        },
        {
            'Holiday': 'Family Day',
            'Date': '2020-02-17'
        },
    ]
}

# import the json file created
try:
    wb_dict = open("wb_dict.json", 'r')
    datastore = json.load(wb_dict)
finally:
    wb_dict.close()


def test_get_user_input(monkeypatch):
    monkeypatch.setattr('builtins.input', lambda _: "some non-integer input")
    with pytest.raises(IidError) as excinfo:
        get_user_input(10)
    assert "Please enter integers ranging from 1 to 10" in str(excinfo.value)

    monkeypatch.setattr('builtins.input', lambda _: "2")
    assert get_user_input(10) == 2

    monkeypatch.setattr('builtins.input', lambda _: "10")
    assert get_user_input(10) == 10


def test_get_iid_range():
    assert get_iid_range(datastore) == 30


def test_get_cid_from_iid():
    assert get_cid_from_iid(2) == 2
    assert get_cid_from_iid(16) == 5
    assert get_cid_from_iid(88) == "no c_id found"


def test_get_customer_names():
    assert get_customer_names(15) == ["Yvonne", "Watkins"]
    assert get_customer_names(6) == ["Doris", "Reed"]
    assert get_customer_names(998) == 'no customer found'


def test_get_invoice_date_from_iid():
    assert get_invoice_date_from_iid(20) == "2019-03-13"
    assert get_invoice_date_from_iid(2) == "2019-03-01"
    assert get_invoice_date_from_iid(99) == "no record found"


def test_get_pid_quantity_from_iid():
    assert get_pid_quantity_from_iid(13) == [[7], [1]]
    assert get_pid_quantity_from_iid(27) == [[6, 7], [1, 1]]
    assert get_pid_quantity_from_iid(17) == [[1], [2]]
    assert get_pid_quantity_from_iid(10) == [[4, 5], [1, 1]]


def test_get_products_price_from_pid():
    assert get_products_price_from_pid([3]) == [["Strength Training I"], [400]]
    assert get_products_price_from_pid([5, 9]) == [["Yoga", "Cycling"],
                                                   [300, 500]]


def test_get_invoice_content(monkeypatch):
    monkeypatch.setattr('builtins.input', lambda _: "10")
    assert get_invoice_content() == {
        "i_id": 10,
        "f_name": 'Sally',
        "l_name": 'Pierce',
        "date": '2019-03-05',
        "amount": [500, 300],
        "product": ['Strength Training II', 'Yoga'],
        "quantity": [1, 1]
    }


def test_print_invoice():
    # enter 1 for iid to pass this test
    s = 15
    l = 25
    info = get_invoice_content()
    string = f'-------------------------------------  Invoice -------------------------------------\n\n' + 'First Name'.ljust(
        s) + 'Last Name'.ljust(s) + 'Date'.ljust(s) + 'Amount ($)'.ljust(
            s
        ) + 'Product'.ljust(l) + 'Quantity'.ljust(s) + '\n' + 'James'.ljust(
            s) + 'Gannon'.ljust(s) + '2019-03-01'.ljust(s) + '400'.ljust(
                s) + 'Strength Training I'.ljust(l) + "1".ljust(s) + '\n\n\n'
    assert print_invoice(info) == string
