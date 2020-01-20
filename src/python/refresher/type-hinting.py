from typing import List  # Tuple, Set, etc..


# takes a list, returns a float
def list_avg(seq: List) -> float:
    return sum(seq) / len(seq)


print(list_avg([2, 3, 45]))
