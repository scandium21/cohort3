//---- imported react components ------------------
import React from "react";
import DefaultReact from "./components/DefaultReact";
import Icon from "./components/Icon";
import TicTacToe from "./components/TicTacToe";
import AccountCtrl from "./components/AccountCtrl";
//---- imported images ----------------------------
import react from "./assets/icons/react.svg";
import tictactoe from "./assets/icons/tictactoe.svg";
import money from "./assets/icons/money.svg";
import city from "./assets/icons/city.svg";
import "./App.css";
//-------------------------------------------------

class App extends React.Component {
  constructor(props) {
    super(props);
    // iconData contains: source of the icon image,
    // content to render, heading to display when that icon is clicked
    this.iconData = {
      react: [react, <DefaultReact />, "Hello World from React"],
      tictactoe: [tictactoe, <TicTacToe />, "Tic Tac Toe"],
      accounts: [money, <AccountCtrl />, `Accounts`],
      city: [city, null, `City & Community`]
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
    const style = { backgroundColor: "#e1ffa8", borderRadius: "10%" };
    for (let item in this.iconData) {
      let icon = (
        <Icon
          style={this.state.iconClicked === item ? style : null}
          onClick={this.handleClickIcon}
          source={this.iconData[item][0]}
          alt={item}
          key={item}
          title={item}
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
              : "Welcome!"}
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
