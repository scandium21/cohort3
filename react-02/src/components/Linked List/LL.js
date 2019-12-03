import React from "react";
import LLform from "./LLform";
import useListState from "./useListState";
import ListNode from "./ListNode";
import uuid from "uuid/v4";
import { SinglyLinkedList as singly } from "./SinglyLinkedList";
import { DoublyLinkedList as doubly } from "./DoublyLinkedList";

const LL = props => {
  let isSingly = props.type === "singly";
  const [list, setListSt] = useListState(null);
  const createNewNode = (sub, amt) => {
    setListSt(
      !list
        ? isSingly
          ? new singly(sub, amt)
          : new doubly(sub, amt)
        : list.makeCopy()
    );
  };
  const mapNodesToComp = list => {
    let currNode = list.first();
    let nodes = [];
    while (currNode) {
      nodes.push(<ListNode node={currNode} isSingly={isSingly} key={uuid()} />);
      currNode = list.next(currNode);
    }
    return nodes;
  };
  return (
    <div>
      <LLform type={props.type} createNode={createNewNode} list={list} />
      {list && mapNodesToComp(list)}
    </div>
  );
};

export default LL;
