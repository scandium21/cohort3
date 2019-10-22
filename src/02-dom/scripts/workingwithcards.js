const wc = {
  // define UI var
  leftPanel: document.querySelector(".left-panel"),
  right: document.querySelector(".right-panel"),
  // card index
  index: 0,
  // create h2 elem
  createH2: (text, index) => {
    let h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode(`${text} ${index}`));
    h2.id = "r" + index;
    return h2;
  },

  // create p element
  createP: index => {
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(`Card ${index}`));
    p.id = `p${index}`;
    return p;
  },

  // create div with the passed classname
  createDiv: (className, id) => {
    let div = document.createElement("div");
    div.className = className;
    div.id = id;
    return div;
  },

  // create button with the passed classname
  createButton: className => {
    let btn = document.createElement("button");
    btn.className = className;
    btn.appendChild(
      document.createTextNode(
        className.includes("before")
          ? "Add Before"
          : className.includes("after")
          ? "Add After"
          : "Delete"
      )
    );
    return btn;
  },

  // create left card
  createLeftCard: index => {
    // create generic wrapper
    let lc = wc.createDiv("card-wrapper", `l${index}`);
    // create p element and assign text
    // append p to lc
    lc.appendChild(wc.createP(index));
    let div = wc.createDiv("card", ``);
    lc.appendChild(div);
    // create buttons with passed classname
    div.appendChild(wc.createButton("add-before"));
    div.appendChild(wc.createButton("add-after"));
    div.appendChild(wc.createButton("delete"));
    wc.index += 1;
    return lc;
  },

  // create right card
  createRightCard: (text, index) => {
    // create generic wrapper
    let rc = wc.createDiv("right-card", `rc${index}`);
    rc.appendChild(wc.createH2(text, index));
    return rc;
  },

  // add card to bottom
  addCardB: (ptoAppend, right, index) => {
    // create left card and append it
    let lc = wc.createLeftCard(index);
    ptoAppend.appendChild(lc);
    // create right card and append it
    right.appendChild(wc.createRightCard("Right Side", index));
  },

  // add card to top
  addCardT: (ptoAppend, right, index) => {
    // create new cards
    let nlc = wc.createLeftCard(index);
    let nrc = wc.createRightCard("Right Side", index);
    ptoAppend.insertBefore(nlc, ptoAppend.firstChild);
    right.insertBefore(nrc, right.firstChild);
  },

  // delete the card when 'delete' button is pressed
  deleteCurrCard: (itemToDelete, right) => {
    itemToDelete.remove();
    let rightChildToRemove = Array.from(right.children).filter(function(item) {
      return item.id.includes(
        itemToDelete.id.charAt(itemToDelete.id.length - 1)
      );
    });
    right.removeChild(rightChildToRemove[0]);
  }
};

export default wc;
