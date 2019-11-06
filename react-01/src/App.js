import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyComp from './MyComponent/MyComp';
import EvenComponent from './MyComponent/EvenComponent';
import OddComponent from './MyComponent/OddComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.counter = 21;
    this.onPushMe = this.onPushMe.bind(this);
  }

  onPushMe = () => {
    console.log('You pushed me');
    console.log(++this.counter);
    this.setState({
      myState: 'now: ' + this.counter
    });
  };

  evenOrOddComp = () => {
    if (this.counter % 2 === 0) return <EvenComponent />;
    else return <OddComponent />;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            I am in control of this application and my name is SC {this.counter}
          </h1>
          {this.state.myState}
          <button onClick={this.onPushMe}>Push me</button>
          <MyComp whatToSay="What Ever" onPushMe={this.onPushMe} />
          {this.evenOrOddComp()}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
