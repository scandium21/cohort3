import { City, Community } from '../city_community.js';
import { co } from '../communityOps.js';

global.fetch = require('node-fetch');

let div = document.createElement('div');
let divr = document.createElement('div');
let divl = document.createElement('div');
let sel = document.createElement('select');
sel.id = 'cities';
let addNewCityBtn = document.createElement('button');
addNewCityBtn.id = 'add-city';
addNewCityBtn.disabled = false;
let cityCtrl;
const beijing = new City('beijing', 39.913818, 116.363625, 20035455);
const calgary = new City('calgary', 51.04427, -114.062019, 1267344);
const sydney = new City('sydney', -33.865143, 151.2099, 4627000);

async function reset() {
  removeAllChildren(div);
  removeAllChildren(sel);

  // mimicing html environment
  div.appendChild(divr);
  div.appendChild(divl);
  divl.appendChild(sel);
  divl.appendChild(addNewCityBtn);
  co.rightPanel = divr;
  co.leftPanel = divl;
  co.addCity = addNewCityBtn;
  co.select = sel;
  co.lastKey = 0;
  co.cityCtrl = new Community();

  cityCtrl = new Community();

  await co.postData(co.url + 'clear');
  return await co.retrieveData();
}

// remove all children element
function removeAllChildren(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

test('testing createAddCityUI()', async () => {
  // reset
  let servData = await reset();
  expect(div.childElementCount).toBe(2);
  expect(cityCtrl.getNumOfCities()).toBe(0);
  expect(servData).toEqual(new Community());
  expect(co.cityCtrl).toEqual(new Community());
  // actual test
  co.createAddCityUI();
  expect(divr.children[0].childElementCount).toEqual(15);
});

test('testing retrieveData()', async () => {
  // reset
  let servData = await reset();
  expect(div.childElementCount).toBe(2);
  expect(cityCtrl.getNumOfCities()).toBe(0);
  expect(servData).toEqual(new Community());
  expect(co.cityCtrl).toEqual(new Community());
  // actual test
  await co.postData(co.url + 'clear');
  let data = await co.retrieveData();
  expect(data).toEqual(cityCtrl);
  cityCtrl.createCity('beijing', 39.913818, 116.363625, 20035455);
  cityCtrl.changeCommunityName('Group 1');
  //console.log(cityCtrl);
  data = await co.postData(co.url + 'add', { key: 1, city: beijing });
  //data = await co.postData(co.url + 'all');
  //console.log(data);
  //console.log(data[0]['c']);
  data = await co.retrieveData();
  expect(co.cityCtrl).toEqual(cityCtrl);
  //console.log(co.lastKey, typeof co.lastKey);
});

test('testing storeCityInfo()', async () => {
  // reset
  let servData = await reset();
  expect(div.childElementCount).toBe(2);
  expect(cityCtrl.getNumOfCities()).toBe(0);
  expect(servData).toEqual(new Community());
  expect(co.cityCtrl).toEqual(new Community());
  // actual test
  co.createAddCityUI();
  expect(divr.children[0].childElementCount).toEqual(15);
  //console.log(divr.querySelector('.new-city'));
  let cityName = divr.querySelector('#in-name');
  let cityLat = divr.querySelector('#in-lat');
  let cityLong = divr.querySelector('#in-long');
  let cityPop = divr.querySelector('#in-pop');
  cityName.value = 'calgary';
  cityLat.value = 51.04427;
  cityLong.value = -114.062019;
  cityPop.value = 1267344;
  cityCtrl.createCity('calgary', 51.04427, -114.062019, 1267344);

  expect(divl.querySelector('#cities')).toEqual(sel);
  await co.storeCityInfo(divr.querySelector('.new-city'));
  expect(co.cityCtrl.getNumOfCities()).toEqual(1);
  expect(co.cityCtrl).toEqual(cityCtrl);
  expect(divl.querySelector('#cities').childElementCount).toEqual(1);
});
