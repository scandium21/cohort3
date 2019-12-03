import { useState } from "react";

export default l => {
  const [list, setListState] = useState(l);
  return [list, setListState];
};
