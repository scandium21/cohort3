import React, { useState } from "react";
import SLL from "./SLL";
import DLL from "./DLL";

const List = () => {
  const [singly, setSingly] = useState(true);
  // const toggle = () => {
  //   setSingly(!singly);
  // };
  return (
    <div>
      <h2>Your List Shows Here</h2>
      <form>
        Choose a list:
        <label htmlFor="singly">
          Singly
          <input
            type="radio"
            name="singly"
            id="singly"
            checked={singly}
            onChange={e => {
              setSingly(!singly);
            }}
          />
        </label>
        <label htmlFor="doubly">
          Doubly
          <input
            type="radio"
            name="doubly"
            id="doubly"
            checked={!singly}
            onChange={e => {
              setSingly(!singly);
            }}
          />
        </label>
      </form>
      {singly && <SLL />}
      {!singly && <DLL />}
    </div>
  );
};

export default List;
