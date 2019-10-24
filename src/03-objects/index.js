import { ao } from './accOps.js';

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  //document.addEventListener();
  ao.addAcc.addEventListener('click', () => {
    ao.createRightCard();
    ao.createNewAccount();
  });
  ao.rightPanel.addEventListener('click', e => {
    if (e.target.id === 'submit') {
      ao.storeAccInfo();
    }
  });
}
