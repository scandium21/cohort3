export class City {
  constructor(
    name = 'Default',
    latitude = 0,
    longitude = 0,
    population = 0,
    id
  ) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
    this.latitude = latitude;
    this.longitude = longitude;
    this.population = population;
    this.id = id;
  }

  show() {
    return `${this.name} ${this.latitude} ${this.longitude} ${this.population}`;
  }

  movedIn(num) {
    if (num > 0) this.population += num;
    return this.population;
  }

  movedOut(num) {
    if (num >= this.population) this.population = 0;
    else if (num > 0) this.population -= num;
    return this.population;
  }

  howBig() {
    if (this.population > 100000) return 'City';
    else if (this.population > 20000) return 'Large town';
    else if (this.population > 1000) return 'Town';
    else if (this.population > 100) return 'Village';
    else return 'Hamlet';
  }

  whichSphere() {
    if (this.latitude > 0) return 'Northern Hemisphere';
    else if (this.latitude < 0) return 'Southern Hemisphere';
    else return 'The Equator';
  }

  getPop() {
    return this.population;
  }

  getLat() {
    return this.latitude;
  }

  getLong() {
    return this.longitude;
  }

  getName() {
    return this.name;
  }
}

export class Community {
  constructor(name = 'Empty', cities = []) {
    this.name = name;
    this.cities = cities;
  }

  getCityByID(id) {
    return this.cities.filter(city => city.id === id)[0];
  }

  changeCommunityName(newName) {
    this.name = newName;
    return newName;
  }

  makeCopy() {
    return new Community(this.name, this.cities);
  }

  getNumOfCities() {
    return this.cities.length;
  }

  getCities() {
    return this.cities;
  }

  static createCityFromClass(name, latitude, longitude, population, id) {
    return new City(name, latitude, longitude, population, id);
  }

  createCity(name, latitude, longitude, population, id) {
    return this.cities.push(
      new City(name, latitude, longitude, population, id)
    );
  }

  createCityfromCity(city) {
    return this.cities.push(city);
  }

  deleteCity(id) {
    this.cities = this.cities.filter(city => city.id !== id);
  }

  getMostNorthern() {
    return this.cities.length === 0
      ? null
      : this.cities.reduce((acc, i) => {
          if (acc.getLat() < i.getLat()) acc = i;
          return acc;
        });
  }

  getMostSouthern() {
    return this.cities.length === 0
      ? null
      : this.cities.reduce((acc, i) => {
          if (acc.getLat() > i.getLat()) acc = i;
          return acc;
        });
  }

  getPopulation() {
    return this.cities.reduce((acc, item) => acc + item.getPop(), 0);
  }
}
