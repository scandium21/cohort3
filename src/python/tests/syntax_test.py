import pytest
import sys
sys.path.insert(0, '../')
import syntax


def test_add():
  assert syntax.add(2,3) == 5
  assert syntax.add(0.1,0.13) == 0.23

def test_subtract():
  assert syntax.subtract(2,3) == -1

def test_divide():
  assert syntax.divide(3,4) == 0.75

# Assert that a certain exception is raised
def test_string_len():
    assert syntax.string_len('22') == 2
    with pytest.raises(syntax.UseTypeException):
        syntax.string_len(22)

# Execute the test function with “quiet” reporting mode:
# $ pytest -q test_file_name.py
# -s not to catch the console output

