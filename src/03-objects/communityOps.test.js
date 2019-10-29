import { City, Community } from './city_community.js';
import { co } from './communityOps.js';

let div = document.createElement('div');
let divr = document.createElement('div');
let divl = document.createElement('div');
let cityCtrl;
const beijing = new City('beijing', 39.913818, 116.363625, 20035455);
const calgary = new City('calgary', 51.04427, -114.062019, 1267344);
const sydney = new City('sydney', -33.865143, 151.2099, 4627000);

const reset = () => {
  removeAllChildren(div);

  // mimicing html environment
  div.appendChild(divr);
  div.appendChild(divl);
  co.rightPanel = divr;
  co.leftPanel = divl;

  cityCtrl = new Community();
};

// remove all children element
function removeAllChildren(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

test('testing addNewCity()', () => {
  // reset
  reset();
  expect(div.childElementCount).toBe(2);
  expect(cityCtrl.getNumOfCities()).toBe(0);
  // actual test
  expect(co.addNewCity()).toEqual(1);
  expect(co.addNewCity()).toEqual(2);
  expect(divr.children[0].childElementCount).toEqual(15);
});
