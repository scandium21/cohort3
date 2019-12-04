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
  const handleInsertFront = () => {
    props.insertFront(props.id, sub, amt);
    rSub();
    rAmt();
  };
  const handleAppend = () => {
    props.append(props.id, sub, amt);
    rSub();
    rAmt();
  };
  const handleInsertBefore = () => {
    props.insertBefore(props.id, sub, amt);
    rSub();
    rAmt();
  };
  const handleInsertAfter = () => {
    props.insertAfter(props.id, sub, amt);
    rSub();
    rAmt();
  };
  return (
    <div>
      <h3>Build your {`${props.type}`} linked list: </h3>
      <form>
        <label htmlFor="subject">
          Subject:
          <input type="text" id="subject" value={sub} onChange={setSub} />
        </label>
        <label htmlFor="amount">
          Amount:
          <input type="text" id="amount" value={amt} onChange={setAmt} />
        </label>
      </form>
      <div className="nodemanip-btns">
        {(!props.list || props.list.length === 0) && (
          <button onClick={handleCreateNode}>Create Head Node</button>
        )}
        {props.list && props.list.length > 0 && (
          <button onClick={handleInsertFront}>Insert Front</button>
        )}
        {props.list && props.list.length > 0 && (
          <button onClick={handleAppend}>Append Node</button>
        )}
        {props.list && props.list.length > 0 && (
          <button onClick={handleInsertBefore}>Insert Before Curr Node</button>
        )}
        {props.list && props.list.length > 0 && (
          <button onClick={handleInsertAfter}>Insert After Curr Node</button>
        )}
      </div>
    </div>
  );
};

export default LLform;
