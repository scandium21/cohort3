class Node {
    constructor (val=0, percent=0, next = null) {
        this.val = val;
        this.percent = percent;
        this.next = next;
    }
}

class SinglyLinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val, percent) {
        let newNode = new Node(val, percent);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length += 1;
        return this;
    }


}

/*  Fed tax
    15% on the first $47,630 of taxable income, plus
    20.5% on the next $47,629 of taxable income (on the portion of taxable income over 47,630 up to $95,259), plus
    26% on the next $52,408 of taxable income (on the portion of taxable income over $95,259 up to $147,667), plus
    29% on the next $62,704 of taxable income (on the portion of taxable income over 147,667 up to $210,371), plus
    33% of taxable income over $210,371
*/

let bracket = new SinglyLinkedList();
let bracketVal = [47630, 47630, 95259, 147667, 210371];
let bracketPerc = [0.15, 0.205, 0.26, 0.29, 0.33];

for (let i = bracketPerc.length - 1; i >= 0; i--) {
    bracket.push(bracketVal[i], bracketPerc[i])
}

const taxCalHelper = (income, node) => {
    
    if (node.next === null) {
        return income * node.percent;
    }
    if (income > node.val) {
        let tax = (income - node.val) * node.percent;
        return tax + taxCalHelper(node.val, node.next);
    } else {
        return taxCalHelper(income, node.next);
    }
}

const taxCal = (income) => {
    return taxCalHelper(income, bracket.head);
}

idSubmitBtn.addEventListener("click", ()=>{
    idFedTax.textContent = taxCal(Math.round(parseFloat(idIncome.value)*100)/100);
});


