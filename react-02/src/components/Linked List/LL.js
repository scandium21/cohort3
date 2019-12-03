import React, { useState } from "react";
import LLform from "./LLform";
import useListState from "./useListState";
import ListNode from "./ListNode";
import uuid from "uuid/v4";
import { SinglyLinkedList as singly } from "./SinglyLinkedList";
import { DoublyLinkedList as doubly } from "./DoublyLinkedList";

const LL = props => {
  let isSingly = props.type === "singly";
  const [list, setListSt] = useListState(null);
  const [type, setTypeSt] = useState(props.type);
  const [currNode, setCurrNodeSt] = useState(list ? list.head : null);
  const createNewNode = (sub, amt) => {
    let id = uuid();
    setListSt(
      list !== null && list.length !== 0
        ? list.makeCopy()
        : isSingly
        ? new singly(sub, amt, id)
        : new doubly(sub, amt, id)
    );
  };
  const moveToNode = position => {
    setCurrNodeSt(list.moveToPos(position));
  };
  const deleteNode = id => {
    let newList = list.makeCopy();
    let node = newList.getNodeById(id);
    let newPos = newList.delete(node);
    setListSt(newList);
    setCurrNodeSt(newPos);
  };
  const mapNodesToComp = list => {
    if (type !== props.type && list !== null) {
      setListSt(null);
      setTypeSt(props.type);
      return null;
    }
    if (type !== props.type && list === null) {
      setTypeSt(props.type);
      return null;
    }
    if (type === props.type && list === null) return null;
    let currNode = list.first();
    let nodes = [];
    while (currNode) {
      nodes.push(
        <ListNode
          node={currNode}
          isSingly={isSingly}
          key={currNode.id}
          id={currNode.id}
          moveToNode={moveToNode}
          deleteNode={deleteNode}
        />
      );
      currNode = list.next(currNode);
    }
    return nodes;
  };
  return (
    <div>
      <LLform type={props.type} createNode={createNewNode} list={list} />
      {mapNodesToComp(list)}
    </div>
  );
};

export default LL;
