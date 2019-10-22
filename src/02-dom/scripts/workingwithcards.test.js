import wc from './workingwithcards.js';

let divMain = wc.createDiv('test-div', '');
let div = wc.createDiv('left-wrapper', '');
let divr = wc.createDiv('test-divr', '');
let h1 = document.createElement('h1');
h1.textContent = 'Add Card';
div.appendChild(h1);
divMain.appendChild(div);
divMain.appendChild(divr);

const append = (appendTo, elem) => {
  appendTo.appendChild(elem);
  return appendTo;
};

const getElemBy = (div, att) => {
  let it = div.querySelector(att);
  return it;
};

const getChildText = (div, att) => {
  let it = div.querySelector(att);
  return it.textContent;
};

const removeAllChildren = elem => {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};

// test('testing creating h2 elem', () => {
//   append(div, wc.createH2('h2', 1));
//   expect(getChildText(div, 'h2')).toEqual('h2 1');
// });

// test('testing creating p elem', () => {
//   append(div, wc.createP('1'));
//   expect(getChildText(div, 'p')).toEqual('Card 1');
// });

// test('testing creating div', () => {
//   append(div, wc.createDiv('className', 'idTestDive'));
//   expect(getChildText(div, '.className')).toEqual('');
// });

// test('testing creating button', () => {
//   append(div, wc.createButton('add-before'));
//   append(div, wc.createButton('add-after'));
//   append(div, wc.createButton('delete'));
//   expect(getChildText(div, '.add-before')).toEqual('Add Before');
//   expect(getChildText(div, '.add-after')).toEqual('Add After');
//   expect(getChildText(div, '.delete')).toEqual('Delete');
// });

// test('testing creating left card', () => {
//   append(div, wc.createLeftCard('1'));
//   expect(getElemBy(div, '.card-wrapper').childElementCount).toEqual(2);
// });

// test('testing creating right card', () => {
//   append(div, wc.createRightCard('Right Side', wc.index));
//   expect(getElemBy(div, '.right-card').childElementCount).toEqual(1);
// });

// test("testing delete current card", () => {
//   wc.deleteCurrCard(div, div);
//   expect(wc.childElementCount).toEqual(6);
// });

test('testing addCardB (add card to bottom)', () => {
  removeAllChildren(div);
  div.appendChild(h1);
  expect(div.childElementCount).toEqual(1);
  wc.addCardB(div, divr, 2);
  expect(div.childElementCount).toEqual(2);
  wc.addCardB(div.children[1], divr, 3);
  expect(div.childElementCount).toEqual(3);
  wc.addCardB(div.children[1], divr, 4);
  expect(div.childElementCount).toEqual(4);
  expect(getChildText(div, '#p2')).toEqual('Card 2');
  expect(getElemBy(divr, 'h2').textContent).toEqual('Right Side 2');
  expect(getChildText(div, '#p3')).toEqual('Card 3');
  expect(getElemBy(divr, '#r3').textContent).toEqual('Right Side 3');
});

test('testing addCardT (add card to top)', () => {
  removeAllChildren(div);
  removeAllChildren(divr);
  div.appendChild(h1);
  expect(div.childElementCount).toEqual(1);
  expect(div.children[0].textContent).toMatch('Add Card');
  wc.addCardB(div, divr, 4);
  expect(div.childElementCount).toEqual(2);
  expect(divr.childElementCount).toEqual(1);
  expect(divr.children[0].id).toEqual('rc4');
  expect(divr.querySelector('#rc4')).toEqual(divr.firstChild);
  wc.addCardT(div.children[1], divr, 5);
  expect(div.childElementCount).toEqual(3);
  expect(div.children[1].textContent).toMatch('Card 5');
  expect(divr.children[0].textContent).toEqual('Right Side 5');
  expect(div.children[2].textContent).toMatch('Card 4');
  expect(divr.children[1].textContent).toEqual('Right Side 4');
});

test('testing deleteCurrCard()', () => {
  wc.deleteCurrCard(getElemBy(div, '#l5'), divr);
  expect(div.childElementCount).toEqual(2);
  expect(divr.childElementCount).toEqual(1);
  expect(div.children[1].textContent).toMatch('Card 4');
  expect(divr.children[0].textContent).toEqual('Right Side 4');
});
