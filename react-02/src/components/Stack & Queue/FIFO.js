import { SinglyLinkedList } from "../Linked List/SinglyLinkedList";

export class FIFO extends SinglyLinkedList {
  constructor(subject, amount) {
    super(subject, amount);
  }
  delete() {
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
  }
}
