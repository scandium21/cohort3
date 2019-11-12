import React from 'react';
import logo from '../assets/logo.svg';

const DefaultReact = props => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Hello World from ReacJS!</p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
};

export default DefaultReact;
