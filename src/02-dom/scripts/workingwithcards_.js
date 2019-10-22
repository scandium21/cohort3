// define UI var
const leftPanel = document.querySelector(".left-panel");
const right = document.querySelector(".right-panel");

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  leftPanel.addEventListener("click", takeAction);
}

// decide what to do based on the button clicked
function takeAction(e) {
  let ptoAppend;
  if (e.target.classList.contains("main-add")) {
    ptoAppend = e.target.parentElement;
    addCardB(ptoAppend);
  } else if (e.target.classList.contains("add-after")) {
    ptoAppend = e.target.parentElement.parentElement.parentElement;
    addCardB(ptoAppend);
  } else if (e.target.classList.contains("add-before")) {
    ptoAppend = e.target.parentElement.parentElement.parentElement;
    addCardT(ptoAppend);
  } else if (e.target.classList.contains("delete")) {
    ptoAppend = e.target.parentElement.parentElement;
    deleteCurrCard(ptoAppend);
  }
}

// delete the card when 'delete' button is pressed
function deleteCurrCard(e) {
  let lctoBeRemoved = e.target.parentElement.parentElement;
  // get index to remove the right card at index - 1
  let index = Array.from(lctoBeRemoved.parentElement.children).indexOf(
    lctoBeRemoved
  );
  lctoBeRemoved.remove();
  right.removeChild(right.children[index - 1]);
}

// add card to top
function addCardT(ptoAppend) {
  // create new cards
  let nlc = createLeft(ptoAppend);
  let nrc = createRight("Right Side");
  ptoAppend.insertBefore(
    nlc,
    ptoAppend.firstChild.nextElementSibling.nextElementSibling
  );
  fixNumbering(ptoAppend);
  right.insertBefore(nrc, right.firstChild);
}

// fix numbering when adding to front
function fixNumbering(ptoAppend) {
  Array.from(ptoAppend.children).forEach((item, index) => {
    if (item.firstChild && item.firstChild.textContent.includes("Card "))
      item.firstChild.textContent = `Card ${index}`;
  });
}

// add card to bottom
function addCardB(ptoAppend) {
  // create left card and append it
  let lc = createLeft(ptoAppend);
  ptoAppend.appendChild(lc);
  // create right card and append it
  right.appendChild(createRight("Right Side"));
}

// create left card
function createLeft(parent) {
  // create generic wrapper
  let lc = createDiv("card-wrapper");
  // create p element and assign text
  // append p to lc
  lc.appendChild(createP(parent));
  let div = createDiv("card");
  lc.appendChild(div);
  // create buttons with passed classname
  div.appendChild(createButton("add-before"));
  div.appendChild(createButton("add-after"));
  div.appendChild(createButton("delete"));
  return lc;
}

// create right card
function createRight(text) {
  // create generic wrapper
  let rc = createDiv("right-card");
  rc.appendChild(createH2(text));
  return rc;
}

// create div with the passed classname
function createDiv(className) {
  let div = document.createElement("div");
  div.className = className;
  return div;
}

// create button with the passed classname
function createButton(className) {
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
}

// create p element
function createP(parent) {
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(`Card ${cardNumGen(parent)}`));
  return p;
}

// generate card numbers
function cardNumGen(parent) {
  if (parent.childElementCount === 1) {
    return 1;
  }
  // get last child numbering
  let elem = parent.lastChild.firstChild.textContent;
  let num = elem.charAt(elem.length - 1);
  return parseInt(num) + 1;
}

// create h2 elem
function createH2(text) {
  let h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode(text));
  return h2;
}

// export { addCard };
