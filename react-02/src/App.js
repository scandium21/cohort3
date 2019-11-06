import React from 'react';
import logo from './logo.svg';
import Icon from './components/Icon';
import wa from './assets/icons/woodage.svg';
import fold from './assets/icons/fold.svg';
import taco from './assets/icons/taco.svg';
import dd from './assets/icons/Daruma.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.iconName = {
      wa: 'wood-age',
      fold: 'fold',
      taco: 'taco',
      dd: 'daruma-doll'
    };
    this.state = { iconClicked: null };
    this.onClickIcon = this.onClickIcon.bind(this);
  }

  onClickIcon = e => {
    this.setState({
      iconClicked: e.target.alt
    });
  };

  render() {
    const clicked = <p>{this.state.iconClicked} was clicked!</p>;
    return (
      <div className="App">
        <div className="Title">
          <h1>Hello World</h1>
          <Icon onClick={this.onClickIcon} source={wa} alt={this.iconName.wa} />
          <Icon
            onClick={this.onClickIcon}
            source={fold}
            alt={this.iconName.fold}
          />
          <Icon
            onClick={this.onClickIcon}
            source={taco}
            alt={this.iconName.taco}
          />
          <Icon onClick={this.onClickIcon} source={dd} alt={this.iconName.dd} />
        </div>
        {this.state.iconClicked && clicked}

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
