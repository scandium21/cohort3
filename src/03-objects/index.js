import { ao } from './accOps.js';

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', ao.toggleHidden);
  ao.leftPanel.addEventListener('click', e => {
    switch (e.target.id) {
      case 'add-acc':
        e.target.disabled = true;
        ao.removeRightSide(ao.rightPanel);
        ao.createRightCard('Creating New Account');
        break;
      case 'del-acc':
        ao.delAcc(e.target.parentElement.querySelector('#accounts'));
        break;
      case 'show-acc':
        ao.removeRightSide(ao.rightPanel);
        let accounts = e.target.parentElement.querySelector('#accounts');
        ao.createRightCardShow(accounts.options[accounts.selectedIndex]);
        break;
    }
  });

  ao.rightPanel.addEventListener('click', e => {
    let accName = e.target.parentElement.querySelector('h2').textContent;
    switch (e.target.id) {
      case 'submit':
        ao.storeAccInfo(e.target);
        break;
      case 'cancel':
        ao.removeRightSide(ao.rightPanel);
        ao.addAcc.disabled = false;
        break;
      case 'confirm':
        ao.updateAccBal(
          e.target.parentElement.querySelector('#acc-dep-amt'),
          accName
        );
        break;
      case 'confirm1':
        ao.updateAccBal(
          e.target.parentElement.querySelector('#acc-wid-amt'),
          accName
        );
        break;
    }
  });
}
