import { ao } from '../accOps.js';
import { Account, AccountController } from '../account.js';

// mimicing html environment
let div = document.createElement('div');
let div2 = document.createElement('div');
div.appendChild(div2);
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
  expect(div2.children[0].childElementCount).toEqual(9);
  expect(div2.children[0].children[2].id).toEqual('new-acc-name');
  expect(div2.children[0].children[5].id).toEqual('new-acc-init-bal');
});

test('testing div2 cleared after createRightCard()', () => {
  // remove all div2 children
  removeAllChildren(div2);
  expect(div2.childElementCount).toBe(0);
});

test('testing pupolateSelect()', () => {
  // creating Account and AccountController
  let testAC0 = new AccountController();
  testAC0.addAccount('SC', '');
  // create aritificial inputs and button
  let accName = ao.createInput('new-acc-name', 'text');
  let accInitBal = ao.createInput('new-acc-init-bal', 'number');
  accName.value = 'SC';
  accInitBal.value = '';
  expect(div2.childElementCount).toBe(0);
  let sel = document.createElement('select');
  sel.id = 'accounts';
  ao.leftPanel = div2;
  div2.appendChild(sel);
  expect(ao.populateSelect(testAC0).text).toEqual('SC');
  expect(div2.childElementCount).toEqual(1);
  expect(sel.children.length).toEqual(1);
  expect(sel.children[0].text).toEqual('SC');
});

test('testing div2 cleared after pupolateSelect()', () => {
  // remove all div2 children
  removeAllChildren(div2);
  expect(div2.childElementCount).toBe(0);
});

test('testing storeAccInfo()', () => {
  expect(div2.childElementCount).toBe(0);
  // creating Account and AccountController
  let testAC = new AccountController();
  testAC.addAccount('SC', 222);
  // create aritificial inputs and button
  let accName = ao.createInput('new-acc-name', 'text');
  let accInitBal = ao.createInput('new-acc-init-bal', 'number');
  accName.value = 'SC';
  accInitBal.value = 222;
  let sel = document.createElement('select');
  sel.id = 'accounts';
  ao.leftPanel = div2;
  div2.appendChild(sel);
  let btn = ao.createButton('submit');
  div2.appendChild(accName);
  div2.appendChild(accInitBal);
  div2.appendChild(btn);
  ao.addAcc = btn;
  expect(div2.childElementCount).toBe(4);
  expect(btn.parentElement).toBe(div2);
  expect(ao.storeAccInfo(btn)).toEqual(testAC);
});

// reset div
let div3 = document.createElement('div');
div.appendChild(div3);
div3.className = 'right-panel';

test('testing delAcc()', () => {
  expect(div3.childElementCount).toBe(0);
  // creating Account and AccountController
  let testAC3 = new AccountController();
  testAC3.addAccount('SC', 222);
  // create aritificial inputs and button
  let accName2 = ao.createInput('new-acc-name', 'text');
  let accInitBal2 = ao.createInput('new-acc-init-bal', 'number');
  accName2.value = 'SC';
  accInitBal2.value = 222;
  let sel2 = document.createElement('select');
  sel2.id = 'accounts';
  ao.leftPanel = div3;
  div3.appendChild(sel2);
  let btn2 = ao.createButton('submit');
  div3.appendChild(accName2);
  div3.appendChild(accInitBal2);
  div3.appendChild(btn2);
  ao.addAcc = btn2;
  ao.accCtrl = new AccountController();

  expect(div3.childElementCount).toBe(4);
  expect(btn2.parentElement).toBe(div3);
  expect(ao.accCtrl.checkAccounts().length).toEqual(0);
  expect(ao.storeAccInfo(btn2)).toEqual(testAC3);
  expect(ao.accCtrl.checkAccounts().length).toEqual(1);
  expect(div3.querySelector('#accounts')).toEqual(sel2);
  expect(div3.querySelector('#accounts').children[0].text).toEqual('SC');
  div3.querySelector('#accounts').children[0].selected = 'selected';
  expect(
    div3.querySelector('#accounts').options[
      div3.querySelector('#accounts').selectedIndex
    ].text
  ).toEqual('SC');
  expect(ao.delAcc(sel2)).toEqual(testAC3.removeAccount('SC'));
  expect(ao.accCtrl.checkAccounts().length).toEqual(0);
});

// delete all previous elements
test('clearing all elements', () => {
  // remove all div2 children
  removeAllChildren(div);
  expect(div.childElementCount).toBe(0);
  expect(div).toEqual(document.createElement('div'));
});

test('test createRightCardShow()', () => {
  // create new set of divs
  let div4 = document.createElement('div');
  div.appendChild(div4);
  div4.className = 'left-panel';
  ao.accCtrl = new AccountController();

  // create elements to simulate real html environment
  let selCRCS = document.createElement('select');
  selCRCS.id = 'accounts';
  div4.appendChild(selCRCS);
  ao.accCtrl.addAccount('checking', 333);
  ao.leftPanel = div4;
  ao.rightPanel = div4;
  expect(ao.populateSelect(ao.accCtrl).text).toEqual('checking');
  expect(selCRCS.childElementCount).toEqual(1);
  selCRCS.children[0].selected = 'selected';

  // set up resulting div
  ao.createRightCardShow(selCRCS.children[0]);
  expect(div4.childElementCount).toEqual(2);
});

// delete all previous elements
test('clearing all elements', () => {
  // remove all div2 children
  removeAllChildren(div);
  expect(div.childElementCount).toBe(0);
  expect(div).toEqual(document.createElement('div'));
});

test('testing updateAccBal()', () => {
  // create new set of divs
  let div4 = document.createElement('div');
  div.appendChild(div4);
  ao.accCtrl = new AccountController();

  // create elements to simulate real html environment
  let selCRCS = document.createElement('select');
  selCRCS.id = 'accounts';
  div4.appendChild(selCRCS);
  ao.accCtrl.addAccount('checking', 333);
  ao.leftPanel = div4;
  ao.rightPanel = div4;
  expect(ao.populateSelect(ao.accCtrl).text).toEqual('checking');
  expect(selCRCS.childElementCount).toEqual(1);
  selCRCS.children[0].selected = 'selected';

  // set up resulting div
  ao.createRightCardShow(selCRCS.children[0]);
  expect(div4.childElementCount).toEqual(2);
  expect(div4.querySelectorAll('input').length).toBe(2);
  expect(div4.querySelectorAll('input')[0].id).toBe('acc-dep-amt');
  div4.querySelectorAll('input')[0].value = 2;
  expect(div4.querySelectorAll('input')[1].id).toBe('acc-wid-amt');
  div4.querySelectorAll('input')[1].value = 4;
  expect(ao.updateAccBal(div4.querySelectorAll('input')[0], 'checking')).toBe(
    335
  );
  expect(ao.updateAccBal(div4.querySelectorAll('input')[1], 'checking')).toBe(
    331
  );
  div4.querySelectorAll('input')[0].value = -34;
  expect(ao.updateAccBal(div4.querySelectorAll('input')[0], 'checking')).toBe(
    undefined
  );
  div4.querySelectorAll('input')[0].value = 2;
  expect(ao.updateAccBal(div4.querySelectorAll('input')[0], 'checking')).toBe(
    333
  );
  div4.querySelectorAll('input')[1].value = 28374;
  expect(ao.updateAccBal(div4.querySelectorAll('input')[1], 'checking')).toBe(
    0
  );
});

// delete all previous elements
test('clearing all elements', () => {
  // remove all div2 children
  removeAllChildren(div);
  expect(div.childElementCount).toBe(0);
  expect(div).toEqual(document.createElement('div'));
});

// test getLow
test('testing getLow', () => {
  // create new set of divs
  let div4 = document.createElement('div');
  div.appendChild(div4);
  ao.leftPanel = div4;
  ao.rightPanel = div4;
  // create elements to simulate real html environment
  let selCRCS = document.createElement('select');
  selCRCS.id = 'accounts';
  div4.appendChild(selCRCS);

  ao.accCtrl = new AccountController();
  ao.accCtrl.addAccount('saving', 3333);
  expect(ao.populateSelect(ao.accCtrl).text).toEqual('saving');
  ao.accCtrl.addAccount('checking', 333);

  expect(ao.populateSelect(ao.accCtrl).text).toEqual('checking');
  expect(div4.querySelector('#accounts')).toEqual(selCRCS);
  expect(selCRCS.childElementCount).toEqual(2);
  expect(selCRCS.children[0].id).toEqual('checking');
  expect(selCRCS.children[1].id).toEqual('saving');
  expect(selCRCS.children[0].text).toEqual('checking');
  expect(selCRCS.children[1].text).toEqual('saving');
  expect(ao.leftPanel.querySelector('#checking').text).toEqual('checking');
  expect(ao.leftPanel.querySelector('#saving').text).toEqual('saving');
  selCRCS.children[0].selected = 'selected';
  expect(ao.accCtrl.checkAccounts().length).toBe(2);
  expect(ao.getLow(ao.accCtrl)).toEqual(new Account('checking', 333));
});

// delete all previous elements
test('clearing all elements', () => {
  // remove all div2 children
  removeAllChildren(div);
  expect(div.childElementCount).toBe(0);
  expect(div).toEqual(document.createElement('div'));
});

// test getHigh
test('testing getHigh', () => {
  // create new set of divs
  let div4 = document.createElement('div');
  div.appendChild(div4);
  ao.leftPanel = div4;
  ao.rightPanel = div4;
  // create elements to simulate real html environment
  let selCRCS = document.createElement('select');
  selCRCS.id = 'accounts';
  div4.appendChild(selCRCS);

  ao.accCtrl = new AccountController();
  ao.accCtrl.addAccount('saving', 3333);
  expect(ao.populateSelect(ao.accCtrl).text).toEqual('saving');
  ao.accCtrl.addAccount('checking', 333);

  expect(ao.populateSelect(ao.accCtrl).text).toEqual('checking');
  expect(div4.querySelector('#accounts')).toEqual(selCRCS);
  expect(selCRCS.childElementCount).toEqual(2);
  expect(selCRCS.children[0].id).toEqual('checking');
  expect(selCRCS.children[1].id).toEqual('saving');
  expect(selCRCS.children[0].text).toEqual('checking');
  expect(selCRCS.children[1].text).toEqual('saving');
  expect(ao.leftPanel.querySelector('#checking').text).toEqual('checking');
  expect(ao.leftPanel.querySelector('#saving').text).toEqual('saving');
  selCRCS.children[0].selected = 'selected';
  expect(ao.accCtrl.checkAccounts().length).toBe(2);
  expect(ao.getHigh(ao.accCtrl)).toEqual(new Account('saving', 3333));
});

// delete all previous elements
test('clearing all elements', () => {
  // remove all div2 children
  removeAllChildren(div);
  expect(div.childElementCount).toBe(0);
  expect(div).toEqual(document.createElement('div'));
});

// test get total bal
test('testing getTotalBal()', () => {
  // create new set of divs
  let div4 = document.createElement('div');
  div.appendChild(div4);
  ao.leftPanel = div4;
  ao.rightPanel = div4;
  // create elements to simulate real html environment
  let selCRCS = document.createElement('select');
  selCRCS.id = 'accounts';
  div4.appendChild(selCRCS);

  ao.accCtrl = new AccountController();
  ao.accCtrl.addAccount('saving', 3333);
  expect(ao.populateSelect(ao.accCtrl).text).toEqual('saving');
  ao.accCtrl.addAccount('checking', 333);
  expect(ao.populateSelect(ao.accCtrl).text).toEqual('checking');

  expect(ao.getTotalBal(ao.accCtrl)).toEqual(3666);
});
