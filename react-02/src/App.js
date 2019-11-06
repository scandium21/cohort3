import React from "react";
import logo from "./logo.svg";
import Icon from "./components/Icon";
import wa from "./assets/icons/woodage.svg";
import fold from "./assets/icons/fold.svg";
import taco from "./assets/icons/taco.svg";
import dd from "./assets/icons/Daruma.svg";
import Game from "./components/Game";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.iconName = {
      wa: "wood-age",
      fold: "fold",
      taco: "taco",
      dd: "daruma-doll"
    };
    this.state = { iconClicked: null, toRender: null };
    // this.onClickIcon = this.onClickIcon.bind(this);
  }

  onClickIcon = e => {
    let toRender;
    switch (e.target.alt) {
      case "wood-age":
        toRender = this.renderDefaultReact;
        break;
      case "fold":
        toRender = this.renderTicTacToe;
        break;
      default:
        toRender = null;
    }
    this.setState({
      iconClicked: e.target.alt,
      toRender: toRender
    });
  };

  renderHeading() {
    // const clicked = <p>{this.state.iconClicked} was clicked!</p>;
    const style = { backgroundColor: "#e1ffa8", borderRadius: "10%" };
    return (
      <div className="App">
        <div className="Title">
          <h1>Hello World</h1>
          <Icon
            style={this.state.iconClicked === this.iconName.wa ? style : {}}
            onClick={this.onClickIcon}
            source={wa}
            alt={this.iconName.wa}
          />
          <Icon
            style={this.state.iconClicked === this.iconName.fold ? style : {}}
            onClick={this.onClickIcon}
            source={fold}
            alt={this.iconName.fold}
          />
          <Icon
            style={this.state.iconClicked === this.iconName.taco ? style : {}}
            onClick={this.onClickIcon}
            source={taco}
            alt={this.iconName.taco}
          />
          <Icon
            style={this.state.iconClicked === this.iconName.dd ? style : {}}
            onClick={this.onClickIcon}
            source={dd}
            alt={this.iconName.dd}
          />
        </div>
        {/* {this.state.iconClicked && clicked} */}
      </div>
    );
  }

  renderDefaultReact() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome!</p>
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
  }

  renderTicTacToe() {
    return <Game />;
  }

  render() {
    return (
      <div>
        {this.renderHeading()}
        {this.state.toRender ? this.state.toRender() : null}
      </div>
    );
  }
}

export default App;
