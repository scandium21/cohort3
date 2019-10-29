import { City, Community } from './city_community.js';

export const co = {
  // define UI var
  leftPanel: document.querySelector('.left-panelc'),
  rightPanel: document.querySelector('.right-panelc'),
  //addAcc: document.querySelector('#add-city'),
  //select: document.querySelector('#cities'),
  cityCtrl: new Community(),

  // create h2 elem
  createH2: text => {
    let h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(`${text}`));
    return h2;
  },

  // create div with the passed classname
  createDiv: (className, id) => {
    let div = document.createElement('div');
    div.className = className;
    div.id = id;
    return div;
  },

  // create label
  createLabel: text => {
    let l = document.createElement('label');
    l.id = text.split(' ').reduce((acc, item) => {
      if (item.charAt(0) < `A` || item.charAt(0) > `z`) {
        return (acc += '');
      } else {
        return (acc += item.toLowerCase());
      }
    }, '');
    l.textContent = text;
    return l;
  },

  // create input field of certain id
  createInput: (id, type) => {
    let input = document.createElement('input');
    input.id = id;
    input.type = type;
    return input;
  },

  // create button with the passed classname
  createButton: id => {
    let btn = document.createElement('button');
    btn.id = `${id}${
      co.rightPanel.querySelectorAll(`#${id}`).length > 0
        ? co.rightPanel.querySelectorAll(`#${id}`).length
        : ''
    }`;
    let name = id.charAt(0).toUpperCase() + id.slice(1);
    btn.appendChild(document.createTextNode(name));

    return btn;
  },

  createAddCityUI() {
    // create generic wrapper
    let rc = co.createDiv('new-city', 'new-city');
    co.rightPanel.appendChild(rc);
    rc.appendChild(co.createH2('Adding New City'));
    rc.appendChild(co.createLabel('Name: '));
    rc.appendChild(co.createInput('in-name', 'text'));
    rc.appendChild(document.createElement('br'));
    rc.appendChild(co.createLabel('Latitude: '));
    rc.appendChild(co.createInput('in-lat', 'number'));
    rc.appendChild(document.createElement('br'));
    rc.appendChild(co.createLabel('Longitude: '));
    rc.appendChild(co.createInput('in-long', 'number'));
    rc.appendChild(document.createElement('br'));
    rc.appendChild(co.createLabel('Population: '));
    rc.appendChild(co.createInput('in-pop', 'number'));
    rc.appendChild(document.createElement('br'));
    rc.appendChild(co.createButton('submit'));
    rc.appendChild(co.createButton('cancel'));
  },

  addNewCity() {
    co.createAddCityUI();
    return co.cityCtrl.createCity();
  }
};
