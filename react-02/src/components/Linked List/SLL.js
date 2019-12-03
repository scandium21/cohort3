import useInputState from "./useInputState";
import React from "react";
import { SinglyLinkedList as singly } from "./SinglyLinkedList";

const SLL = props => {
  const [sub, setSub, rSub] = useInputState("");
  const [amt, setAmt, rAmt] = useInputState("");
  const onSubmit = e => {
    e.preventDefault();
    rSub();
    rAmt();
  };
  return (
    <div>
      <h3>Build your singly linked list: </h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="subject">
          Subject:
          <input type="text" id="subject" value={sub} onChange={setSub} />
        </label>
        <label htmlFor="amount">
          Amount:
          <input type="text" id="amount" value={amt} onChange={setAmt} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SLL;
