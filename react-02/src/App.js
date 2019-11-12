//---- imported react components ------------------
import React from 'react';
import DefaultReact from './components/DefaultReact';
import Icon from './components/Icon';
import TicTacToe from './components/TicTacToe';
//---- imported images ----------------------------
import wa from './assets/icons/woodage.svg';
import fold from './assets/icons/fold.svg';
import taco from './assets/icons/taco.svg';
import dd from './assets/icons/Daruma.svg';
import './App.css';
//-------------------------------------------------

class App extends React.Component {
  constructor(props) {
    super(props);
    // iconData contains: source of the icon image,
    // content to render, heading to display when that icon is clicked
    this.iconData = {
      wa: [wa, <DefaultReact />, 'Hello World from React'],
      fold: [fold, <TicTacToe />, 'Tic Tac Toe'],
      taco: [taco, null, `Hi I'm a taco`],
      dd: [dd, null, `I'm a Daruma doll`]
    };
    this.state = { iconClicked: null };
    this.handleClickIcon = this.handleClickIcon.bind(this);
  }

  handleClickIcon = e => {
    let selected = e.target.alt;
    this.setState({
      iconClicked: selected
    });
  };

  renderIcons() {
    const icons = [];
    const style = { backgroundColor: '#e1ffa8', borderRadius: '10%' };
    for (let prop in this.iconData) {
      let icon = (
        <Icon
          style={this.state.iconClicked === prop ? style : null}
          onClick={this.handleClickIcon}
          source={this.iconData[prop][0]}
          alt={prop}
          key={prop}
        />
      );
      icons.push(icon);
    }
    return icons;
  }

  renderHeading() {
    return (
      <div className="App">
        <div className="Title">
          <h1>
            {this.state.iconClicked
              ? this.iconData[this.state.iconClicked][2]
              : 'Welcome!'}
          </h1>
          {this.renderIcons()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeading()}
        {this.state.iconClicked && this.iconData[this.state.iconClicked][1]}
      </div>
    );
  }
}

export default App;
