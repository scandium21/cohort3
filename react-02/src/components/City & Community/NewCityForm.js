import React, { Component } from "react";

class NewCityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityPop: "",
      cityLat: "",
      cityLong: ""
    };
    this.id = 0;
  }
  handleCreate = e => {
    e.preventDefault();
    for (let prop of Object.keys(this.state)) {
      if (!this.state[prop]) {
        alert("Please enter all required info");
        return;
      }
    }
    this.props.create({ ...this.state, id: ++this.id });
    this.setState({
      cityName: "",
      cityPop: "",
      cityLat: "",
      cityLong: ""
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]:
        e.target.name === "cityPop" ? parseInt(e.target.value) : e.target.value
    });
  };
  render() {
    return (
      <div>
        <h2>Add New City</h2>
        <form>
          <label htmlFor="cityName">City Name: </label>
          <input
            type="text"
            id="cityName"
            name="cityName"
            value={this.state.cityName}
            onChange={this.handleChange}
          />
          <label htmlFor="cityPop">Population: </label>
          <input
            type="number"
            id="cityPop"
            name="cityPop"
            min="0"
            value={this.state.cityPop}
            onChange={this.handleChange}
          />
          <label htmlFor="cityLat">Latitude: </label>
          <input
            type="number"
            name="cityLat"
            id="cityLat"
            min="-90"
            max="90"
            value={this.state.cityLat}
            onChange={this.handleChange}
          />
          <label htmlFor="cityLong">Longitude: </label>
          <input
            type="number"
            name="cityLong"
            id="cityLong"
            min="-180"
            max="180"
            value={this.state.cityLong}
            onChange={this.handleChange}
          />
          <button onClick={this.handleCreate}>Create</button>
        </form>
      </div>
    );
  }
}

export default NewCityForm;
