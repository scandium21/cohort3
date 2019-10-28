import { City, Community } from './city_community.js';

const beijing = new City('beijing', 39.913818, 116.363625, 20035455);
const calgary = new City('calgary', 51.04427, -114.062019, 1267344);
const sydney = new City('sydney', -33.865143, 151.2099, 4627000);
const cities = new Community();
const citiesExp = [sydney, calgary];

test('testing City class methods and constructor', () => {
  expect(beijing.show()).toBe(`Beijing 39.913818 116.363625 20035455`);
  expect(beijing.movedIn(20000)).toBe(20035455 + 20000);
  expect(beijing.movedOut(50000)).toBe(20035455 + 20000 - 50000);
  expect(beijing.howBig()).toEqual('City');
  expect(calgary.howBig()).toEqual('City');
  expect(calgary.whichSphere()).toEqual('Northern Hemisphere');
  expect(sydney.whichSphere()).toEqual('Southern Hemisphere');
});

test('testing Community class methods and constructor', () => {
  expect(cities.getNumOfCities()).toEqual(0);
  expect(cities.createCity('sydney', -33.865143, 151.2099, 4627000)).toEqual(1);
  expect(cities.createCity('calgary', 51.04427, -114.062019, 1267344)).toEqual(
    2
  );
  expect(cities.getCities()).toEqual(citiesExp);
  expect(cities.getNumOfCities()).toEqual(2);
  expect(cities.getMostNorthern()).toEqual(calgary);
  expect(cities.getMostSouthern()).toEqual(sydney);
  expect(cities.getPopulation()).toEqual(1267344 + 4627000);
  expect(cities.deleteCity(sydney)).toEqual(sydney);
  expect(cities.getCities()).toEqual([calgary]);
  expect(cities.getNumOfCities()).toEqual(1);
});
