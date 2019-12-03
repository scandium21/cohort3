import React, { useState } from "react";
import LL from "./LL";

const List = () => {
  const [singly, setSingly] = useState(true);
  return (
    <div>
      <h2>Your List Shows Here</h2>
      <form>
        <span style={{ display: "inline-block", width: "100px" }}>
          Choose a list:
        </span>
        <label htmlFor="singly">
          <input
            type="radio"
            name="singly"
            id="singly"
            checked={singly}
            onChange={e => {
              setSingly(!singly);
            }}
          />
          Singly Linked
        </label>
        <label htmlFor="doubly">
          <input
            type="radio"
            name="doubly"
            id="doubly"
            checked={!singly}
            onChange={e => {
              setSingly(!singly);
            }}
          />
          Doubly Linked
        </label>
      </form>
      <LL type={singly ? "singly" : "doubly"} />
    </div>
  );
};

export default List;
