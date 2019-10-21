// define UI vars
const il = document.querySelector('.ol');
const show = document.querySelector('#idShow');
const hide = document.querySelector('#idHide');
const at = document.querySelector('#idAddTop');
const ab = document.querySelector('#idAddBtm');
const dt = document.querySelector('#idDeletet');
const db = document.querySelector('#idDeleteb');
const p = document.querySelector('#idText');

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
  // show all list items
  show.addEventListener('click', showList);
  // hide all list items
  hide.addEventListener('click', hideList);
  // add an item to top of list
  at.addEventListener('click', () => {
    addItemT(askUserInput());
  });
  // add an item to btm of list
  ab.addEventListener('click', () => {
    addItemB(askUserInput());
  });
  // delete an item from top
  dt.addEventListener('click', deleteTop);
  // delete an item from bottom
  db.addEventListener('click', deleteBtm);
}

// show all list items
function showList() {
  if (il.childElementCount === 0)
    p.textContent = 'Empty list. Add items first ~';
  else il.style.display = 'block';
}

// hide all list items
function hideList() {
  il.style.display = 'none';
}

// ask user for input to add
function askUserInput() {
  return prompt('Enter item you want to add:');
}

// add an item to top of list
function addItemT(text) {
  // create li element
  const li = document.createElement('li');
  // Add class
  li.className = '';
  // create textNode and append to li
  li.appendChild(document.createTextNode(`${text}`));

  // change text
  if (il.childElementCount === 0) {
    p.textContent = 'This is a list of stuff';
    il.appendChild(li);
    return;
  }
  // insert to front of list
  il.insertBefore(li, il.firstChild);
}

// add an item to btm of list
function addItemB(text) {
  // change text
  if (il.childElementCount === 0) {
    p.textContent = 'This is a list of stuff';
  }
  // create li element
  const li = document.createElement('li');
  // Add class
  li.className = '';
  // create textNode and append to li
  li.appendChild(document.createTextNode(`${text}`));

  // append the li to ul
  il.appendChild(li);
}

// delete an item from top
function deleteTop() {
  if (il.childElementCount === 0) {
    p.textContent = 'Empty list';
    return;
  }
  il.removeChild(il.firstChild);
}

// delete an item from bottom
function deleteBtm() {
  if (il.childElementCount === 0) {
    p.textContent = 'Empty list';
    return;
  }
  il.removeChild(il.lastElementChild);
}

// export { showList, hideList, addItemT, addItemB, deleteTop, deleteBtm };
