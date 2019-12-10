import { SinglyLinkedList } from "../Linked List/SinglyLinkedList";

class Stack extends SinglyLinkedList {
  constructor(subject, amount) {
    super(subject, amount);
  }
  /**
   * Removes the value at the end of the stack and returns it
   */
  pop() {
    if (!this.head) return this;
    let deleted = this.last();
    console.log(deleted);
    this.delete(deleted);
    return deleted;
  }
  /**
   * Adds a new value at the end of the stack
   * @param {*} subject
   * @param {*} amount
   */
  push(subject, amount) {
    let currNode = this.head;
    while (currNode.next) {
      currNode = currNode.next;
    }
    super.insert(currNode, subject, amount);
    return this;
  }
  makeCopy() {
    let currNode = this.head;
    const newStack = new Stack(currNode.subject, currNode.amount, currNode.id);
    currNode = currNode.next;
    let p = newStack.head;
    while (currNode) {
      newStack.insert(p, currNode.subject, currNode.amount, currNode.id);
      currNode = currNode.next;
      p = p.next;
    }
    return newStack;
  }
}

export default Stack;
