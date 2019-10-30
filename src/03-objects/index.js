import { ao } from './accOps.js';
import { co } from './communityOps.js';

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', async () => {
    ao.toggleHidden();
    await co.retrieveData();
    co.toggleHidden();
  });
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
      case 'get-total':
        ao.removeRightSide(ao.rightPanel);
        ao.getTotalBal(ao.accCtrl);
        break;
      case 'get-high':
        ao.removeRightSide(ao.rightPanel);
        ao.getHigh(ao.accCtrl);
        break;
      case 'get-low':
        ao.removeRightSide(ao.rightPanel);
        ao.getLow(ao.accCtrl);
        break;
    }
  });
  ao.select.addEventListener('change', e => {
    ao.removeRightSide(ao.rightPanel);
    let accounts = e.target.parentElement.querySelector('#accounts');
    ao.createRightCardShow(accounts.options[accounts.selectedIndex]);
  });

  ao.rightPanel.addEventListener('click', e => {
    let accName = e.target.parentElement.querySelector('h2').textContent;
    switch (e.target.id) {
      case 'submit':
        ao.storeAccInfo(e.target);
        ao.createRightCardShow(accounts.options[accounts.selectedIndex]);
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

  co.leftPanel.addEventListener('click', e => {
    switch (e.target.id) {
      case 'add-city':
        e.target.disabled = true;
        co.removeRightSide(co.rightPanel);
        co.createAddCityUI('Adding New City');
    }
  });

  co.select.addEventListener('change', e => {
    co.removeRightSide(co.rightPanel);
    let cities = e.target.parentElement.querySelector('#cities');
    co.createRightCardShow(cities.options[cities.selectedIndex]);
  });

  co.rightPanel.addEventListener('click', e => {
    let cityName = e.target.parentElement.querySelector('h2').textContent;
    switch (e.target.id) {
      case 'submit':
        co.storeCityInfo(e.target.parentElement);
        co.createRightCardShow(cities.options[cities.selectedIndex]);
        break;
      case 'cancel':
        co.removeRightSide(co.rightPanel);
        co.addCity.disabled = false;
        break;
      case 'confirm':
        co.updateAccBal(
          e.target.parentElement.querySelector('#acc-dep-amt'),
          accName
        );
        break;
      case 'confirm1':
        co.updateAccBal(
          e.target.parentElement.querySelector('#acc-wid-amt'),
          accName
        );
        break;
    }
  });
}
