import React from "react";

const RadioInput = props => {
  return (
    <input
      type="radio"
      value={props.value}
      checked={props.playOption === props.value}
      onChange={e => {
        props.handleRadioClick(e);
      }}
    />
  );
};

export default RadioInput;
