export class ListNode {
  constructor(subject = "", amount = 0, id, next = null) {
    this.subject = subject;
    this.amount = amount;
    this.id = id;
    this.next = next;
  }
  show() {
    return `subject: ${this.subject} amount: ${this.amount}`;
  }
}

/*
  first ⇒ position to the first node
  last ⇒ position to the last node
  next ⇒ move to the next node
  previous ⇒ backup one node (how are we going to do this?)
  insert ⇒ inserts a new node after the current node (which node will be the current node after the insertion?)
  delete ⇒ delete the current node (which node will be the current node after the deletion?)

*/
export class SinglyLinkedList {
  constructor(subject, amount, id) {
    this.head = new ListNode(subject, amount, id);
    this.length = 1;
  }
  getNodeById(id) {
    let p = this.head;
    while (p && p.id !== id) {
      p = p.next;
    }
    return p;
  }
  first() {
    return this.head;
  }
  last() {
    if (!this.head) return null;
    let p = this.head;
    while (p.next != null) {
      p = p.next;
    }
    return p;
  }
  makeCopy() {
    let currNode = this.head;
    const newList = new SinglyLinkedList(
      currNode.subject,
      currNode.amount,
      currNode.id
    );
    currNode = currNode.next;
    let p = newList.head;
    while (currNode) {
      newList.insert(p, currNode.subject, currNode.amount, currNode.id);
      currNode = currNode.next;
      p = p.next;
    }
    return newList;
  }
  moveToPos(position) {
    let pos = this.head;
    while (pos !== position) {
      pos = pos.next;
    }
    return pos;
  }
  next(position) {
    if (!position) return position;
    return position.next;
  }
  previous(position) {
    if (!position) return position;
    let p = this.head;
    while (p.next !== position) {
      p = p.next;
    }
    return p;
  }
  addFront(subject, amount, id) {
    let newNode = new ListNode(subject, amount, id, this.head);
    this.head = newNode;
    this.length += 1;
    return this.head;
  }
  append(subject = "", amount = 0, id) {
    let newNode = new ListNode(subject, amount, id, null);
    let p = this.head;
    if (!p) {
      this.head = newNode;
      return newNode;
    }
    while (p.next) {
      p = p.next;
    }
    p.next = newNode;
    return newNode;
  }
  insert(position, subject = "", amount = 0, id) {
    let newNode = new ListNode(subject, amount, id, position.next);
    position.next = newNode;
    this.length += 1;
    return newNode;
  }
  insertBefore(position, subject = "", amount = 0, id) {
    let newNode = new ListNode(subject, amount, id, position);
    let p = this.head;
    // insert before head
    if (p === position) {
      return this.addFront(subject, amount, id);
    }
    while (p && p.next !== position) {
      p = p.next;
    }
    p.next = newNode;
    return newNode;
  }
  delete(position) {
    if (position === null) return position;
    this.length -= 1;
    let p = this.head;
    // if head is to be deleted
    if (p === position) {
      if (this.head.next) {
        this.head = this.head.next;
        return this.head;
      } else {
        this.head = null;
        return this.head;
      }
    }
    while (p.next !== position) {
      p = p.next;
    }
    p.next = position.next;
    // returning the node after position, if it's null, return the last node
    return p.next === null ? p : p.next;
  }
  sumAmount() {
    return this.sumAmountHelper(this.head);
  }
  sumAmountHelper(node) {
    if (!node) return node;
    if (node.next === null) return node.amount;
    return this.sumAmountHelper(node.next) + node.amount;
  }
  showNodes() {
    let string = "";
    let p = this.head;
    while (p !== null) {
      string += `${p.show()} -> `;
      p = p.next;
    }
    console.log(string);
  }
  getLength() {
    return this.length;
  }
}
