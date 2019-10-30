export class City {
  constructor(name = 'Default', latitude = 0, longitude = 0, population = 0) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
    this.latitude = latitude;
    this.longitude = longitude;
    this.population = population;
  }

  show() {
    return `${this.name} ${this.latitude} ${this.longitude} ${this.population}`;
  }

  movedIn(num) {
    if (num > 0) this.population += num;
    return this.population;
  }

  movedOut(num) {
    if (num > 0) this.population -= num;
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

  changeCommunityName(newName) {
    this.name = newName;
    return newName;
  }

  getNumOfCities() {
    return this.cities.length;
  }

  getCities() {
    return this.cities;
  }

  static createCityFromClass(city, name, latitude, longitude, population) {
    if (city === undefined)
      return new City(name, latitude, longitude, population);
    let newCity = new City(
      city['name'],
      city['latitude'],
      city['longitude'],
      city['population']
    );
    return newCity;
  }

  createCity(name, latitude, longitude, population) {
    return this.cities.push(new City(name, latitude, longitude, population));
  }

  createCityfromCity(city) {
    return this.cities.push(city);
  }

  deleteCity(city) {
    let toRemove = [];
    this.cities.forEach((c, index) => {
      if (c.show() === city.show()) toRemove.push(c, index);
    });
    if (toRemove.length === 0) return null;
    return this.cities.splice(toRemove[1], 1)[0];
  }

  getMostNorthern() {
    if (this.cities.length === 0) return null;
    let north = this.cities[0];
    this.cities.forEach((city, index) => {
      if (city.getLat() > north.getLat()) north = city;
    });
    return north;
  }

  getMostSouthern() {
    if (this.cities.length === 0) return null;
    let south = this.cities[0];
    this.cities.forEach((city, index) => {
      if (city.getLat() < south.getLat()) south = city;
    });
    return south;
  }

  getPopulation() {
    return this.cities.reduce((acc, item) => acc + item.getPop(), 0);
  }
}
