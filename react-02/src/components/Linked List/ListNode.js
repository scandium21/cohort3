import React from "react";

const ListNode = props => {
  let { subject, amount, next } = props.node;
  return (
    <div>
      <div>
        <div
          style={{
            backgroundColor: "#eee",
            margin: "auto",
            display: "inline-block"
          }}
        >
          <div>{subject}</div>
          <div>{amount}</div>
        </div>
        <div className="listnode-arrow">
          {props.isSingly ? "⬇" /*"↓"*/ : next ? "⇅" : "⬇"}
        </div>
        {!next && (
          <div
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
