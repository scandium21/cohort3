import pytest
from read_data import map_wb_to_dict

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


def test_map_wb_to_dict():
    assert map_wb_to_dict('test_data.xlsx') == test_dict
