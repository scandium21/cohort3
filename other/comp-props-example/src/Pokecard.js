import React, { Component } from 'react';
import './Pokecard.css';

class Pokecard extends Component {
  render() {
    return (
      <div className="Pokecard">
        <h2 style={{ color: 'blue' }}>{this.props.name}</h2>
        <img src={this.props.image} />
        <div>Type: {this.props.type}</div>
      </div>
    );
  }
}

export default Pokecard;
