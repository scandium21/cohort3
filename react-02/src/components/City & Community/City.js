import React, { Component } from "react";

class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeAmt: 0,
      isChanging: false
    };
  }

  handleChangePop = e => {
    this.setState({
      changeAmt: parseInt(e.target.value)
    });
  };

  handleMoveIn = e => {
    e.preventDefault();
    this.props.moveIn(this.props.city.id, this.state.changeAmt);
    this.setState({
      changeAmt: 0
    });
  };

  handleMoveOut = e => {
    e.preventDefault();
    this.props.moveOut(this.props.city.id, this.state.changeAmt);
    this.setState({
      changeAmt: 0
    });
  };

  handleDelCity = () => {
    this.props.delCity(this.props.city.id);
  };
  render() {
    let { name, latitude, longitude, population } = this.props.city;
    return (
      <div>
        <h2>{name}</h2>
        <p>Population: {population}</p>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
        <div>
          <form>
            <label htmlFor="changePop"></label>
            <div>
              <input
                type="Number"
                min={1}
                value={this.state.changeAmt !== 0 && this.state.changeAmt}
                onChange={this.handleChangePop}
              />
              <button onClick={this.handleMoveOut}>Move Out</button>
              <button onClick={this.handleMoveIn}>Move In</button>
            </div>
          </form>
          <button onClick={this.handleDelCity}>Delete</button>
        </div>
      </div>
    );
  }
}

export default City;
