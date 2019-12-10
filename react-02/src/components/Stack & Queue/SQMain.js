import React, { useState } from "react";
import StackOrQueue from "./StackOrQueue";

const SQMain = () => {
  return (
    <div>
      <h2>Emoji Stack & Queue</h2>
      <div
        className="SQMain-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        <StackOrQueue type={"stack"} />
        <StackOrQueue type={"queue"} />
      </div>
    </div>
  );
};

export default SQMain;
