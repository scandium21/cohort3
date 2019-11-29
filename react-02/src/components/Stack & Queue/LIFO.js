import { SinglyLinkedList } from "../Linked List/SinglyLinkedList";

export class LIFO extends SinglyLinkedList {
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
    super.addFront(subject, amount);
  }
}
