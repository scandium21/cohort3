import pytest
import sys
sys.path.insert(0, '../')
from cantax import fed_tax


def test_cantax():
    assert round(fed_tax(47630), 2) == 7144.50
    assert round(fed_tax(1), 2) == 0.15
    assert round(fed_tax(2), 2) == 0.30
    assert round(fed_tax(50000), 2) == 7630.35
    assert round(fed_tax(150000), 2) == 31211.10
    assert round(fed_tax(250000), 2) == 61796.25
