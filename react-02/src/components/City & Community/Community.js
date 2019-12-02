import React, { Component } from 'react';
import NewCityForm from './NewCityForm';
import City from './City';
import { Community as Cities } from './city_community';

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: new Cities()
    };
  }

  moveIn = (id, amt) => {
    let newCities = this.state.cities.makeCopy();
    newCities.getCityByID(id).movedIn(amt);
    this.setState({
      cities: newCities
    });
  };

  moveOut = (id, amt) => {
    let newCities = this.state.cities.makeCopy();
    newCities.getCityByID(id).movedOut(amt);
    this.setState({
      cities: newCities
    });
  };

  delCity = id => {
    let newCities = this.state.cities.makeCopy();
    newCities.deleteCity(id);
    this.setState({
      cities: newCities
    });
  };

  create = ({ cityName, cityPop, cityLat, cityLong, id }) => {
    const newCities = this.state.cities.makeCopy();
    newCities.createCity(cityName, cityLat, cityLong, cityPop, id);
    this.setState({
      cities: newCities
    });
  };
  render() {
    const cities = this.state.cities
      .getCities()
      .map(c => (
        <City
          city={c}
          key={c.id}
          moveIn={this.moveIn}
          moveOut={this.moveOut}
          delCity={this.delCity}
        />
      ));
    let total = this.state.cities.getPopulation();
    let north = this.state.cities.getMostNorthern()
      ? this.state.cities.getMostNorthern().name
      : 'No cities yet';
    let south = this.state.cities.getMostSouthern()
      ? this.state.cities.getMostSouthern().name
      : 'No cities yet';
    return (
      <div>
        <h1>Welcome to the Community!</h1>
        <NewCityForm create={this.create} />
        <div>Total population: {total || 'No cities yet'}</div>
        <div>Most Northern City: {north}</div>
        <div>Most Southern City: {south}</div>
        {cities}
      </div>
    );
  }
}

export default Community;
