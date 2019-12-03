import useInputState from "./useInputState";
import React from "react";

const LLform = props => {
  const [sub, setSub, rSub] = useInputState("");
  const [amt, setAmt, rAmt] = useInputState("");
  const handleCreateNode = e => {
    e.preventDefault();
    props.createNode(sub, amt);
    rSub();
    rAmt();
  };
  return (
    <div>
      <h3>Build your {`${props.type}`} linked list: </h3>
      <form onSubmit={handleCreateNode}>
        <label htmlFor="subject">
          Subject:
          <input type="text" id="subject" value={sub} onChange={setSub} />
        </label>
        <label htmlFor="amount">
          Amount:
          <input type="text" id="amount" value={amt} onChange={setAmt} />
        </label>
        <button>
          {props.list && props.list.length !== 0
            ? "Add Node"
            : "Create Head Node"}
        </button>
      </form>
    </div>
  );
};

export default LLform;
