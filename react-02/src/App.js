//---- imported react components ------------------
import React from "react";
import DefaultReact from "./components/React Default/DefaultReact";
import Icon from "./components/Icon";
import TicTacToe from "./components/Tic Tac Toe/TicTacToe";
import AccountCtrl from "./components/Accounts/AccountCtrl";
import Community from "./components/City & Community/Community";
import ListMain from "./components/Linked List/ListMain";
import SQMain from "./components/Stack & Queue/SQMain";
import ThemeSetting from "./components/ThemeSetting";
import PageContent from "./components/PageContent";
//---- imported images ----------------------------
import react from "./assets/icons/react.svg";
import tictactoe from "./assets/icons/tictactoe.svg";
import money from "./assets/icons/money.svg";
import city from "./assets/icons/city.svg";
import link from "./assets/icons/link.svg";
import stack from "./assets/icons/stack.svg";
import style from "./assets/icons/style.svg";
import "./App.css";
//-------------------------------------------------
import { ThemeProvider, ThemeContext } from "./components/ThemeContext";

class App extends React.Component {
  static contextType = ThemeContext;
  constructor(props) {
    super(props);
    // iconData contains: source of the icon image,
    // content to render, heading to display when that icon is clicked
    this.iconData = {
      react: [react, <DefaultReact />, "Hello World from React"],
      tictactoe: [tictactoe, <TicTacToe />, "Tic Tac Toe"],
      accounts: [money, <AccountCtrl />, `Accounts`],
      city: [city, <Community />, `City & Community`],
      ll: [link, <ListMain />, "Linked List"],
      stack: [stack, <SQMain />, "Stack & Queue"],
      style: [style, <ThemeSetting />, "Style Settings"]
    };
    this.state = { iconClicked: null };
  }

  handleClickIcon = e => {
    let selected = e.target.alt;
    this.setState({
      iconClicked: selected
    });
  };

  renderIcons() {
    const icons = [];
    const style = { backgroundColor: "#e1ffa899", borderRadius: "10%" };
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
      <ThemeProvider>
        <PageContent>
          <div>{this.renderHeading()}</div>
          <div>
            {this.state.iconClicked && this.iconData[this.state.iconClicked][1]}
          </div>
          <footer>{this.props.iconCredit[this.state.iconClicked]}</footer>
        </PageContent>
      </ThemeProvider>
    );
  }
}

export default App;

// acknowledging icon credits
App.defaultProps = {
  iconCredit: {
    react: (
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    ),
    tictactoe: (
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    ),
    accounts: (
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/pause08" title="Pause08">
          Pause08
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    ),
    city: (
      <div>
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/smalllikeart"
          title="smalllikeart"
        >
          smalllikeart
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    ),
    ll: (
      <div>
        Icons made by{" "}
        <a
          href="https://www.flaticon.com/authors/kiranshastry"
          title="Kiranshastry"
        >
          Kiranshastry
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    ),
    stack: (
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">
          Eucalyp
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    ),
    style: (
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    )
  }
};
