import React, { Component } from "react";

class NewCityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityPop: null
    };
  }
  render() {
    return (
      <div>
        <form>
          <label htmlFor="newCity">Add New City: </label>
          <input type="text" name="cityName" id="newCity" />
          <button onClick={this.handleCreate}>Create</button>
        </form>
      </div>
    );
  }
}

export default NewCityForm;
