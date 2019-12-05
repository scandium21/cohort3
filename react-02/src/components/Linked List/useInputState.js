import { useState } from "react";

const useInputState = initVal => {
  const [val, setValState] = useState(initVal);
  const handleChange = e => {
    setValState(e.target.value);
  };
  const reset = e => {
    setValState(parseFloat(""));
  };
  return [val, handleChange, reset];
};

export default useInputState;
