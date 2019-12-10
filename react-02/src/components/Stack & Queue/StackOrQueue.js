import React, { useState } from "react";
import useSorQ from "./useStackOrQueue";
import Card from "./Card";
import Stack from "./Stack";
import Queue from "./Queue";

const StackComp = props => {
  let { faces, fruits, type } = props;
  const [val, setVal] = useSorQ(null, type);
  const SorQ = {
    stack: (emoji, code) => new Stack(emoji, code),
    queue: (emoji, code) => new Queue(emoji, code)
  };
  const push = () => {
    let emojiObj = getEmoji(type === "stack" ? faces : fruits);
    if (!emojiObj) {
      alert("No more faces in the stock!");
      return;
    }
    setVal(
      !val || !val.first()
        ? SorQ[type](emojiObj.emoji, createColor())
        : val.makeCopy().push(emojiObj.emoji, createColor())
    );
  };
  const pop = () => {
    if (!val || !val.head) return;
    const newVal = val.makeCopy();
    newVal.pop();
    setVal(newVal);
  };
  const getEmoji = objList => {
    let randNum = Math.floor(Math.random() * objList.length);
    console.log(randNum);
    return objList.splice(randNum, 1)[0];
  };
  const mapStackToComp = () => {
    if (!val) return val;
    let currNode = val.first();
    const nodes = [];
    while (currNode) {
      nodes.push(
        <Card
          node={currNode}
          face={currNode.subject}
          key={currNode.subject}
          bkgc={currNode.amount}
        />
      );
      currNode = val.next(currNode);
    }
    return nodes;
  };
  return (
    <div className="SorQ-container" style={{ margin: "2%", width: "200px" }}>
      <h2>
        A {`${type}`} of {`${type === "stack" ? `animals!` : `fruits!`}`}
      </h2>
      {mapStackToComp()}
      <div className="SorQ-btns" style={{ marginTop: "5%" }}>
        <button onClick={push}>Push</button>
        <button onClick={pop}>Pop</button>
      </div>
    </div>
  );
};

export default StackComp;

StackComp.defaultProps = {
  faces: [
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
  ],
  fruits: [
    { code: "1F347", emoji: "🍇", alt: "2.0 grapes" },
    { code: "1F348", emoji: "🍈", alt: "2.0 melon" },
    { code: "1F349", emoji: "🍉", alt: "2.0 watermelon" },
    { code: "1F34A", emoji: "🍊", alt: "2.0 tangerine" },
    { code: "1F34B", emoji: "🍋", alt: "2.0 lemon" },
    { code: "1F34C", emoji: "🍌", alt: "2.0 banana" },
    { code: "1F34D", emoji: "🍍", alt: "2.0 pineapple" },
    { code: "1F34E", emoji: "🍎", alt: "2.0 red apple" },
    { code: "1F34F", emoji: "🍏", alt: "2.0 green apple" },
    { code: "1F350", emoji: "🍐", alt: "2.0 pear" },
    { code: "1F351", emoji: "🍑", alt: "2.0 peach" },
    { code: "1F352", emoji: "🍒", alt: "2.0 cherries" },
    { code: "1F353", emoji: "🍓", alt: "2.0 strawberry" },
    { code: "1F95D", emoji: "🥝", alt: "4.0 kiwi fruit" },
    { code: "1F345", emoji: "🍅", alt: "2.0 tomato" },
    { code: "1F951", emoji: "🥑", alt: "4.0 avocado" },
    { code: "1F95C", emoji: "🥜", alt: "4.0 peanuts" },
    { code: "1F330", emoji: "🌰", alt: "2.0 chestnut" }
  ]
};

//https://gomakethings.com/a-better-better-way-to-generate-a-random-color-with-vanilla-js/
const createColor = function() {
  const hex = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ];

  /**
   * Randomly shuffle an array
   * https://stackoverflow.com/a/2450976/1293256
   */
  const shuffle = function() {
    let currentIndex = hex.length;
    let temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = hex[currentIndex];
      hex[currentIndex] = hex[randomIndex];
      hex[randomIndex] = temporaryValue;
    }
  };

  /**
   * Create a six-digit hex color
   */
  const hexColor = function() {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      // Shuffle the hex values
      shuffle(hex);
      // Append first hex value to the string
      color += hex[0];
    }
    return color;
  };

  // Return the color string
  return hexColor();
};
