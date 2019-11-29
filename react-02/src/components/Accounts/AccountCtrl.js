import React, { Component } from "react";
import Account from "./Account";
import NewAccountForm from "./NewAccountForm";

class AccountCtrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      total: null,
      highest: null,
      lowest: null,
      showtotal: false,
      showhighest: false,
      showlowest: false
    };
    this.createAcc = this.createAcc.bind(this);
  }
  createAcc(acc) {
    this.setState(
      {
        accounts: [...this.state.accounts, acc]
      },
      () => {
        this.setState({
          total: this.state.accounts.reduce((acc, i) => acc + i.balance, 0),
          highest: this.state.accounts.reduce(
            (acc, i) => (acc > i.balance ? acc : i.balance),
            0
          ),
          lowest: this.state.accounts.reduce(
            (acc, i) => (acc < i.balance ? acc : i.balance),
            Number.MAX_SAFE_INTEGER
          )
        });
      }
    );
  }
  onDeposit = (amt, id) => {
    this.setState({
      accounts: this.state.accounts.map(acc => {
        if (acc.id === id) return { ...acc, balance: acc.balance + amt };
        return acc;
      })
    });
  };
  onWithdraw = (amt, id) => {
    this.setState({
      accounts: this.state.accounts.map(acc => {
        if (acc.id === id) return { ...acc, balance: acc.balance - amt };
        return acc;
      })
    });
  };
  delAcc = id => {
    this.setState({
      accounts: this.state.accounts.filter(acc => acc.id !== id)
    });
  };

  showTotal = () => {
    this.setState({
      showtotal: !this.state.showtotal
    });
  };
  showHighest = () => {
    this.setState({
      showhighest: !this.state.showhighest
    });
  };
  showLowest = () => {
    this.setState({
      showlowest: !this.state.showlowest
    });
  };
  render() {
    const showCurrAcc = (
      <div>
        {this.state.accounts.map(acc => (
          <Account
            acc={acc}
            key={acc.id}
            onDeposit={this.onDeposit}
            onWithdraw={this.onWithdraw}
            delAcc={this.delAcc}
          />
        ))}
      </div>
    );
    const showStat = (
      <div>
        <button onClick={this.showTotal}>Show Total Balance</button>
        <button onClick={this.showHighest}>Show Highest Balance</button>
        <button onClick={this.showLowest}>Show Lowest Balance</button>
      </div>
    );
    return (
      <div className="Account-container">
        <h1>Welcome to Your Accounts!</h1>
        <NewAccountForm submit={this.createAcc} />
        {this.state.accounts.length > 0 ? showStat : null}
        {this.state.showtotal && <div>Total balance: {this.state.total}</div>}
        {this.state.showhighest && (
          <div>Highest balance: {this.state.highest}</div>
        )}
        {this.state.showlowest && (
          <div>Lowest balance: {this.state.lowest}</div>
        )}
        {showCurrAcc}
      </div>
    );
  }
}

export default AccountCtrl;
