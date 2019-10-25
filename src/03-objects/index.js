import { ao } from './accOps.js';

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', ao.toggleHidden);
  ao.addAcc.addEventListener('click', e => {
    e.target.disabled = true;
    ao.createRightCard('Creating New Account');
    //ao.createNewAccount();
  });
  ao.rightPanel.addEventListener('click', e => {
    if (e.target.id === 'submit') {
      ao.storeAccInfo(e.target);
    }
    if (e.target.id === 'cancel') {
      ao.removeRightSide(ao.rightPanel);
      ao.addAcc.disabled = false;
    }
  });
  //ao.select.addEventListener('')
}
