import { useState } from "react";

export default (init, t) => {
  const [stack, setStack] = useState(init);
  const [queue, setQueue] = useState(init);
  if (t === "stack") {
    return [stack, setStack];
  }
  return [queue, setQueue];
};
