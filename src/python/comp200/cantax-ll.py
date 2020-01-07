class Node:
    def __init__(self, val=0, percent=0, next=None):
        self.val = val
        self.percent = percent
        self.next = next


class SinglyLinkedList:
    def __init__(self, head=None, tail=None, length=0):
        self.head = head
        self.tail = tail
        self.length = 0

    def push(self, val, percent):
        new_node = Node(val, percent)
        if not self.head:
            self.head = new_node
            self.tail = self.head
        else:
            self.tail.next = new_node
            self.tail = new_node
        self.length += 1
        return self

"""
    Tax calc format:
    Fed tax
    15% on the first $47,630 of taxable income, plus
    20.5% on the next $47,629 of taxable income (on the portion of taxable income over 47,630 up to $95,259), plus
    26% on the next $52,408 of taxable income (on the portion of taxable income over $95,259 up to $147,667), plus
    29% on the next $62,704 of taxable income (on the portion of taxable income over 147,667 up to $210,371), plus
    33% of taxable income over $210,371
"""


fed_bracket = [47630, 47630, 95259, 147667, 210371]
fed_percent = [0.15, 0.205, 0.26, 0.29, 0.33]
prov_brackets_percents = {
    'AB': [131220, (26244+131220), (26244+131220+52488), (26244+131220+52488+104976), 314928],
    'ABP': [0.1, 0.12, 0.13, 0.14, 0.15],
    'BC': [40707, (40707+40709),(40707+40709+12060),(40707+40709+12060+20030),(40707+40709+12060+20030+40394),153900],
    'BCP': [0.0506, 0.077, 0.105, 0.1229, 0.147, 0.168],
    'MB': [32670, (32670+37940), 70610],
    'MBP': [0.108, 0.1275, 0.174],
    'NB': [42592, (42592+42592),(42592+53307),(42592+53307+19287),157778],
    'NBP': [0.0968, 0.1482, 0.1652, 0.1784, 0.203],
    'NL': [37591, (37591+37590), (37591+37590+59043),(37591+37590+59043+53689),187913],
    'NLP': [.087, .145, 0.158, 0.173, 0.183],
    'NS': [29590, (29590+29590), (29590+29590+33820),(29590+29590+33820+57000),150000],
    'NSP': [0.0879, 0.1495, 0.1667, 0.175, 0.21],
    'ONT': [43906, (43906+43907), (43906+43907+62187), (43906+43907+62187+70000),220000],
    'ONTP': [0.0505, 0.0915, 0.1116, 0.1216, 0.1316],
    'PE': [31984, (31984+31985), 63969],
    'PEP': [0.098, 0.138, 0.167],
    'SK': [45225, (45225+83989),129214],
    'SKP': [0.105, 0.125, 0.145],
    'NT': [43137, (43137+43140), (43137+43140+53990), 140267],
    'NTP': [0.059, 0.086, 0.122, 0.1405],
    'NU': [45414, (45414+45415), (45414+45415+56838), 147667],
    'NUP': [0.04, 0.07, 0.09, 0.115],
    'YT': [47630, (47630+47629), (47630+47629+52408), (47630+47629+52408+352333),500000],
    'YTP': [0.064, 0.09, 0.109, 0.128, 0.15],
}

def create_list():
    fed_list = SinglyLinkedList()
    prov_list = SinglyLinkedList()
    