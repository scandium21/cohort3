import { SinglyLinkedList } from "../Linked List/SinglyLinkedList";

class Queue extends SinglyLinkedList {
  constructor(subject, amount) {
    super(subject, amount);
  }
  pop() {
    if (!this.head) return this;
    let deleted = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return deleted;
  }
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
    const newQueue = new Queue(currNode.subject, currNode.amount, currNode.id);
    currNode = currNode.next;
    let p = newQueue.head;
    while (currNode) {
      newQueue.insert(p, currNode.subject, currNode.amount, currNode.id);
      currNode = currNode.next;
      p = p.next;
    }
    return newQueue;
  }
}
export default Queue;
