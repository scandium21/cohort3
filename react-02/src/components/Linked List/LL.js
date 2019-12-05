import React, { useState, useEffect } from "react";
import LLform from "./LLform";
import ListNode from "./ListNode";
import uuid from "uuid/v4";
import { SinglyLinkedList as singly } from "./SinglyLinkedList";
import { DoublyLinkedList as doubly } from "./DoublyLinkedList";

const LL = props => {
  let isSingly = props.type === "singly";
  const [list, setListSt] = useState(null);
  const [type, setTypeSt] = useState(props.type);
  const [userNode, setUserNodeSt] = useState(list ? list.head : null);
  useEffect(() => {
    if (!list) return;
    else if (list.length > 1) return;
    setUserNodeSt(list.first());
  }, [list]);
  const createNewNode = (sub, amt) => {
    const id = uuid();
    setListSt(isSingly ? new singly(sub, amt, id) : new doubly(sub, amt, id));
  };
  const moveToNode = position => {
    setUserNodeSt(list.moveToPos(position));
  };
  const deleteNode = id => {
    const newList = list.makeCopy();
    const node = newList.getNodeById(id);
    const newPos = newList.delete(node);
    setListSt(newList);
    setUserNodeSt(newPos);
  };
  const insertFront = (id, sub, amt) => {
    console.log("in LL insertFront amt", amt, "type of amt", typeof amt);
    const nid = uuid();
    const newList = list.makeCopy();
    newList.addFront(sub, amt, nid);
    setListSt(newList);
  };
  const append = (id, sub, amt) => {
    const nid = uuid();
    const newList = list.makeCopy();
    newList.append(sub, amt, nid);
    setListSt(newList);
  };
  const insertBefore = (id, sub, amt) => {
    const nid = uuid();
    const newList = list.makeCopy();
    const node = newList.getNodeById(id);
    newList.insertBefore(node, sub, amt, nid);
    setListSt(newList);
  };
  const insertAfter = (id, sub, amt) => {
    const nid = uuid();
    const newList = list.makeCopy();
    const node = newList.getNodeById(id);
    newList.insert(node, sub, amt, nid);
    setListSt(newList);
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
    const nodes = [];
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
        userNode={userNode}
        emoji={props.emoji[2]}
      />
      {mapNodesToComp(list)}
      <div>
        Current node:
        <div>Subject: {userNode ? userNode.subject : "N/A"}</div>
        <div>Amt: {userNode ? userNode.amount : "N/A"}</div>
      </div>
      <div>Total amount: {list ? list.sumAmount() : "N/A"}</div>
      <br />
      <div>
        <button>Sort by Subject</button>
        <button>Sort by Amount</button>
      </div>
    </div>
  );
};

export default LL;

LL.defaultProps = {
  emoji: ["🎄", "🎅", "🤶🏻", "😍"]
};
