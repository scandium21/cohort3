import React from "react";
import { emojiObj } from "./Emoji";

const ListNode = props => {
  const { subject, amount, next, prev } = props.node;
  const handleMoveToNode = () => {
    props.moveToNode(props.node);
  };
  const handleDeleteNode = () => {
    props.deleteNode(props.id);
  };
  return (
    <div>
      <div>
        {!props.isSingly ? (
          <div
            className="listnode-prev"
            style={
              !props.prev && {
                backgroundColor: "#e4adff",
                margin: "auto",
                display: "inline-block"
              }
            }
          >
            {props.prev ? props.prev : "null"}
          </div> /*"↓"*/
        ) : null}
        {!props.isSingly ? (
          <div className="listnode-uparrow">⬆</div> /*"↓"*/
        ) : null}
        <div
          className="listnode-content"
          style={{
            backgroundColor:
              props.currNode.id === props.id ? "#23efaa" : "#eee",
            margin: "auto",
            display: "inline-block"
          }}
        >
          <div>
            {subject}{" "}
            <span>
              <button onClick={handleMoveToNode}>Move To Node</button>
            </span>
          </div>
          <div>
            {toEmoji(subject, amount)}
            <span>
              <button onClick={handleDeleteNode}>Delete Node</button>
            </span>
          </div>
        </div>
        <div className="listnode-downarrow">
          {props.isSingly ? "⬇" /*"↓"*/ : next ? "⇅" : "⬇"}
        </div>
        {!next && (
          <div
            className="listnode-content-null"
            style={{
              backgroundColor: "#e4adff",
              margin: "auto",
              display: "inline-block"
            }}
          >
            null
          </div>
        )}
      </div>
    </div>
  );
};

export default ListNode;

const toEmoji = (sub, amt) => {
  let cat = emojiObj[sub];
  // let randNum = Math.floor(Math.random() * cat.length);
  let idx = amt > cat.length ? amt % cat.length : amt;
  let emoji = cat[idx].emoji;
  // if (code.length > 5) {
  //   code = code.split(" ");
  //   code = code.reduce((acc, c) => acc + `u{${c}}`, "");
  // } else {
  //   code = `u{${code}}`;
  // }
  return emoji;
};
