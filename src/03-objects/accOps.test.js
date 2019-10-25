import { ao } from './accOps.js';
import { Account, AccountController } from './account.js';

// mimicing html environment
let div = document.createElement('div');
let div2 = document.createElement('div');
div.appendChild(div2);
div.className = 'body';
div2.className = 'right-panel';
ao.rightPanel = div.querySelector('.right-panel');

// remove all children element
function removeAllChildren(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

test('test createRightCard()', () => {
  div2.appendChild(ao.createRightCard('Creating New Account'));
  expect(div2.childElementCount).toBe(1);
  expect(div2.children[0].textContent).toMatch('Creating New Account');
  expect(div2.children[0].childElementCount).toEqual(8);
  expect(div2.children[0].children[2].id).toEqual('new-acc-name');
  expect(div2.children[0].children[5].id).toEqual('new-acc-init-bal');
});

test('testing div2 cleared', () => {
  // remove all div2 children
  removeAllChildren(div2);
  expect(div2.childElementCount).toBe(0);
});

test('testing storeAccInfo()', () => {
  expect(div2.childElementCount).toBe(0);
  // creating Account and AccountController
  let testAC = new AccountController();
  let testAcc = new Account('SC', 0);
  testAC.addAccount('SC', '');
  // create aritificial inputs and button
  let accName = ao.createInput('new-acc-name', 'text');
  let accInitBal = ao.createInput('new-acc-init-bal', 'number');
  accName.value = 'SC';
  accInitBal.value = '';
  let btn = ao.createButton('submit');
  div2.appendChild(accName);
  div2.appendChild(accInitBal);
  div2.appendChild(btn);
  expect(div2.childElementCount).toBe(3);
  expect(btn.parentElement).toBe(div2);
  expect(ao.storeAccInfo(btn)).toEqual(testAC);
});

test('testing div2 cleared 2', () => {
  // remove all div2 children
  removeAllChildren(div2);
  expect(div2.childElementCount).toBe(0);
});

test('testing pupolateSelect()', testAC => {
  let sel = document.createElement('select');
  div2.appendChild(sel);
  ao.populateSelect(testAC);
});
