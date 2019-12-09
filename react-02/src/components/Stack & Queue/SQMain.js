import React, { useState } from "react";
import StackComp from "./StackComp";
import QueueComp from "./QueueComp";
import { template } from "@babel/core";

const SQMain = () => {
  return (
    <div>
      <h2>Emoji Stack & Queue</h2>
      <div className="SQMain-container" style={{ display: "grid" }}>
        <StackComp />
        <QueueComp />
      </div>
    </div>
  );
};

export default SQMain;
