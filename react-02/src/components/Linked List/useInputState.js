import React, { useState } from "react";

const useInputState = initVal => {
  const [val, setVal] = useState(initVal);
  const handleChange = e => {
    setVal(e.target.value);
  };
  const reset = e => {
    setVal("");
  };
  return [val, handleChange, reset];
};

export default useInputState;
