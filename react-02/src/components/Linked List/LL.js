import React, { useState, useEffect } from "react";
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
  const [userNode, setUserNodeSt] = useState(list ? list.head : null);
  const createNewNode = (sub, amt) => {
    let id = uuid();
    setListSt(
      list !== null && list.length !== 0
        ? list.makeCopy()
        : isSingly
        ? new singly(sub, amt, id)
        : new doubly(sub, amt, id)
    );
    setUserNodeSt(list && list.getLength() === 1 && list.head);
  };
  useEffect(() => {
    setUserNodeSt(list && list.head);
  }, [list]);
  const moveToNode = position => {
    setUserNodeSt(list.moveToPos(position));
  };
  const deleteNode = id => {
    let newList = list.makeCopy();
    let node = newList.getNodeById(id);
    let newPos = newList.delete(node);
    setListSt(newList);
    setUserNodeSt(newPos);
  };
  const insertFront = (id, sub, amt) => {
    let nid = uuid();
    const newList = list.makeCopy();
    newList.addFront(sub, amt, nid);
    setListSt(newList);
  };
  const append = (id, sub, amt) => {};
  const insertBefore = (id, sub, amt) => {};
  const insertAfter = (id, sub, amt) => {};
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
          currNode={userNode ? userNode : list.head}
        />
      );
      currNode = list.next(currNode);
    }
    return nodes;
  };
  return (
    <div>
      <LLform
        type={props.type}
        createNode={createNewNode}
        list={list}
        insertFront={insertFront}
        insertBefore={insertBefore}
        insertAfter={insertAfter}
        append={append}
      />
      {mapNodesToComp(list)}
      <div>
        Current node:
        <div>Subject: {userNode ? userNode.subject : "N/A"}</div>
        <div>Amt: {userNode ? userNode.amount : "N/A"}</div>
      </div>
    </div>
  );
};

export default LL;
