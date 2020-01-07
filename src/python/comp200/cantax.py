"""
    Fed tax
    15% on the first $47,630 of taxable income, plus
    20.5% on the next $47,629 of taxable income (on the portion of taxable income over 47,630 up to $95,259), plus
    26% on the next $52,408 of taxable income (on the portion of taxable income over $95,259 up to $147,667), plus
    29% on the next $62,704 of taxable income (on the portion of taxable income over 147,667 up to $210,371), plus
    33% of taxable income over $210,371
"""

fed_bracket = [47630, 47629, 52408, 62704]
fed_percent = [0.15, 0.205, 0.26, 0.29]


def fed_tax(income):
    tax = 0
    for bracket, percent in zip(fed_bracket, fed_percent):
        if income > bracket:
            tax += bracket * percent
            income = income - bracket
        else:
            tax += income * percent
            income = 0
            break
    if income > 0:
        tax += income * 0.33
    return tax