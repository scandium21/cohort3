import { Account, AccountController } from './account.js';

export const ao = {
  // define UI var
  leftPanel: document.querySelector('.left-panel'),
  rightPanel: document.querySelector('.right-panel'),
  addAcc: document.querySelector('#add-acc'),
  // card index
  index: 1,
  // create h2 elem
  createH2: (text, index) => {
    let h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(`${text} ${index}`));
    h2.id = 'r' + index;
    return h2;
  },

  // create p element
  createP: index => {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(`Card ${index}`));
    p.id = `p${index}`;
    return p;
  },

  // create div with the passed classname
  createDiv: (className, id) => {
    let div = document.createElement('div');
    div.className = className;
    div.id = id;
    return div;
  },

  // create button with the passed classname
  createButton: className => {
    let btn = document.createElement('button');
    btn.className = className;
    btn.appendChild(
      document.createTextNode(
        className.includes('before')
          ? 'Add Before'
          : className.includes('after')
          ? 'Add After'
          : 'Delete'
      )
    );
    return btn;
  },

  // create left card
  createLeftCard: index => {
    // create generic wrapper
    let lc = wc.createDiv('card-wrapper', `l${index}`);
    // create p element and assign text
    // append p to lc
    lc.appendChild(wc.createP(index));
    let div = wc.createDiv('card', ``);
    lc.appendChild(div);
    // create buttons with passed classname
    div.appendChild(wc.createButton('add-before'));
    div.appendChild(wc.createButton('add-after'));
    div.appendChild(wc.createButton('delete'));
    wc.index += 1;
    return lc;
  },

  // create right card
  createRightCard: (text, index) => {
    // create generic wrapper
    let rc = wc.createDiv('right-card', `rc${index}`);
    rc.appendChild(wc.createH2(text, index));
    return rc;
  },

  // add card to bottom
  addCardB: (ptoAppend, right = wc.rightPanel, index) => {
    // create left card
    let lc = wc.createLeftCard(index);
    // create right card
    let rc = wc.createRightCard('Right Side', index);
    if (ptoAppend.classList.contains('left-wrapper')) {
      ptoAppend.appendChild(lc);
      right.appendChild(rc);
    } else {
      if (ptoAppend.nextSibling) {
        let parent = ptoAppend.parentElement;
        let toInsertBefore = ptoAppend.nextSibling;
        parent.insertBefore(lc, ptoAppend.nextSibling);

        let id = `#rc${toInsertBefore.id.charAt(toInsertBefore.id.length - 1)}`;
        let currCard = right.querySelector(id);
        right.insertBefore(rc, currCard);
      } else {
        ptoAppend.parentElement.appendChild(lc);
        right.appendChild(rc);
      }
    }
  },

  // add card to top
  addCardT: (ptoAppend, right = rightPanel, index) => {
    // create new cards
    let nlc = wc.createLeftCard(index);
    let nrc = wc.createRightCard('Right Side', index);
    let parent = ptoAppend.parentElement;
    parent.insertBefore(nlc, ptoAppend);
    right.insertBefore(
      nrc,
      right.querySelector(`#rc${ptoAppend.id.charAt(ptoAppend.id.length - 1)}`)
    );
  },

  // delete the card when 'delete' button is pressed
  deleteCurrCard: (itemToDelete, right = wc.rightPanel) => {
    let id = `#rc${itemToDelete.id.charAt(itemToDelete.id.length - 1)}`;
    let rtoremove = right.querySelector(id);
    right.removeChild(rtoremove);
    itemToDelete.remove();
  }
};
