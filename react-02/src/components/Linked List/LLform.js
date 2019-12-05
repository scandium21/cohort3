import useInputState from "./useInputState";
import React from "react";

const LLform = props => {
  const [sub, setSub, rSub] = useInputState("Smileys & Emotion");
  const [amt, setAmt, rAmt] = useInputState("");
  const isValidInput = () => {
    if (!sub || !amt) {
      alert("Please fill in all fields!");
      return false;
    }
    return true;
  };
  const handleCreateNode = e => {
    e.preventDefault();
    if (!isValidInput()) return;
    props.createNode(sub, amt);
    rAmt();
  };
  const handleInsertFront = () => {
    if (!isValidInput()) return;
    props.insertFront(props.userNode.id, sub, amt);
    rAmt();
  };
  const handleAppend = () => {
    if (!isValidInput()) return;
    props.append(props.userNode.id, sub, amt);
    rAmt();
  };
  const handleInsertBefore = () => {
    if (!isValidInput()) return;
    props.insertBefore(props.userNode.id, sub, amt);
    rAmt();
  };
  const handleInsertAfter = () => {
    if (!isValidInput()) return;
    props.insertAfter(props.userNode.id, sub, amt);
    rAmt();
  };
  return (
    <div>
      <h3>
        Build your {`${props.type}`} linked {`🦧`} list:{" "}
      </h3>
      <form>
        <label htmlFor="subject">
          Subject:
          <select name="subject" id="subject" value={sub} onChange={setSub}>
            <option value="Smileys & Emotion">Smileys & Emotion</option>
            <option value="People & Body">People & Body</option>
            <option value="Animals & Nature">Animals & Nature</option>
            <option value="Food & Drink">Food & Drink</option>
            <option value="Travel & Places">Travel & Places</option>
            <option value="Activities">Activities</option>
            <option value="Objects">Objects</option>
            <option value="Symbols">Symbols</option>
          </select>
        </label>
        <label htmlFor="amount">
          Enter a Number:
          <input type="number" id="amount" value={amt} onChange={setAmt} />
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
