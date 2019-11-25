import React, { Component } from 'react';
import NewCityForm from './NewCityForm';

class Community extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    };
  }
  render() {
    return (
      <div>
        <h1>Welcome to the Community!</h1>
        <NewCityForm />
      </div>
    );
  }
}

export default Community;
