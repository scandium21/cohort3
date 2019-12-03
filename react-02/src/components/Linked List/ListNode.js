import React from "react";

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
          <div className="listnode-prev">{props.prev}</div> /*"↓"*/
        ) : null}
        {!props.isSingly ? (
          <div className="listnode-uparrow">⬆</div> /*"↓"*/
        ) : null}
        <div
          className="listnode-content"
          style={{
            backgroundColor: "#eee",
            margin: "auto",
            display: "inline-block"
          }}
        >
          <div>
            {subject}{" "}
            <span>
              <button onClick={handleMoveToNode}>Move To Here</button>
            </span>
          </div>
          <div>
            {amount}{" "}
            <span>
              <button onClick={handleDeleteNode}>Delete</button>
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
