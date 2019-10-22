import wc from './workingwithcards.js';

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  wc.leftPanel.addEventListener('click', takeAction);
}

// decide what to do based on the button clicked
function takeAction(e) {
  let ptoAppend;
  if (e.target.classList.contains('main-add')) {
    ptoAppend = e.target.parentElement;
    wc.addCardB(ptoAppend, wc.rightPanel, wc.index);
  } else if (e.target.classList.contains('add-after')) {
    ptoAppend = e.target.parentElement.parentElement;
    wc.addCardB(ptoAppend, wc.rightPanel, wc.index);
  } else if (e.target.classList.contains('add-before')) {
    ptoAppend = e.target.parentElement.parentElement;
    wc.addCardT(ptoAppend, wc.rightPanel, wc.index);
  } else if (e.target.classList.contains('delete')) {
    ptoAppend = e.target.parentElement.parentElement;
    wc.deleteCurrCard(ptoAppend);
  }
}
