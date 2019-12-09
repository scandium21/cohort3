import React, { useState } from "react";
import Card from "./Card";
import Stack from "./Stack";

const StackComp = props => {
  const faces = props.emojis;
  const [stack, setStack] = useState(null);
  const push = () => {
    if (!getFace()) {
      alert("No more faces in the stock!");
      return;
    }
    setStack(stack ? stack.makeCopy().push(getFace()) : new Stack(getFace()));
  };
  const pop = () => {};
  const getFace = () => {
    let randNum = Math.floor(Math.random() * faces.length);
    return faces.splice(randNum, 1)[0];
  };
  const mapStackToComp = () => {
    if (!stack) return stack;
    let currNode = stack.first();
    const nodes = [];
    while (currNode) {
      nodes.push(<Card node={currNode} face={currNode.subject} />);
      currNode = stack.next(currNode);
    }
    return nodes;
  };
  return (
    <div>
      <h2>This is Stack</h2>
      {mapStackToComp()}
      <div>
        <button onClick={push}>Push</button>
        <button onClick={pop}>Pop</button>
      </div>
    </div>
  );
};

export default StackComp;

StackComp.defaultProps = {
  emojis: [
    { code: "1F435", emoji: "🐵", alt: "2.0 monkey face" },
    { code: "1F436", emoji: "🐶", alt: "2.0 dog face" },
    { code: "1F431", emoji: "🐱", alt: "2.0 cat face" },
    { code: "1F42F", emoji: "🐯", alt: "2.0 tiger face" },
    { code: "1F434", emoji: "🐴", alt: "2.0 horse face" },
    { code: "1F984", emoji: "🦄", alt: "2.0 unicorn" },
    { code: "1F42D", emoji: "🐭", alt: "2.0 mouse face" },
    { code: "1F42E", emoji: "🐮", alt: "2.0 cow face" },
    { code: "1F437", emoji: "🐷", alt: "2.0 pig face" },
    { code: "1F430", emoji: "🐰", alt: "2.0 rabbit face" },
    { code: "1F425", emoji: "🐥", alt: "2.0 front-facing baby chick" },
    { code: "1F427", emoji: "🐧", alt: "2.0 penguin" },
    { code: "1F438", emoji: "🐸", alt: "2.0 frog" },
    { code: "1F432", emoji: "🐲", alt: "2.0 dragon face" },
    { code: "1F98A", emoji: "🦊", alt: "4.0 fox" },
    { code: "1F43B", emoji: "🐻", alt: "2.0 bear" },
    { code: "1F428", emoji: "🐨", alt: "2.0 koala" },
    { code: "1F43C", emoji: "🐼", alt: "2.0 panda" }
  ]
};
