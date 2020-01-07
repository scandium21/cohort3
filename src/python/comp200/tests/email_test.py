import pytest
import sys
sys.path.insert(0, '../')
from email_gen import email


def test_email():
    names = [
        {
            'fname': 'John',
            'lname': 'Snow'
        },
        {
            'fname': 'Pheobe',
            'lname': 'Buffet'
        },
        {
            'fname': 'Richard',
            'lname': 'Ericson'
        },
        {
            'fname': 'Adele',
            'lname': 'Haenel'
        },
        {
            'fname': 'Miles',
            'lname': 'Kwok'
        },
    ]
    emails = [
        'john.snow@gmail.com', 'pheobe.buffet@gmail.com',
        'richard.ericson@gmail.com', 'adele.haenel@gmail.com',
        'miles.kwok@gmail.com'
    ]
    assert [email(name['fname'], name['lname']) for name in names] == emails
