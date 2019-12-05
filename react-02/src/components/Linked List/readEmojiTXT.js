var fs = require("fs");
var eGroups = fs
  .readFileSync("emoji-test.txt")
  .toString()
  .split("# group:");

// console.log(eGroups[1]);
const emojiCodes = {};
eGroups.forEach((g, idx) => {
  if (idx === 0) return;
  const lines = g.trim().split("\n");
  emojiCodes[lines[0]] = [];
  const cat = emojiCodes[lines[0]];
  lines.forEach((l, lidx) => {
    if (l.length < 70 || l.includes("unqualified")) return;
    const code = l.slice(0, 43).trim();
    const frags = l.split("#");
    const emoji = frags[1].trim().split(" ")[0];
    cat.push({ code: code, emoji: emoji });
  });
});
fs.writeFile("./emojiCodes.json", JSON.stringify(emojiCodes), err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File has been created");
});
