import React, { Component } from "react";
import Account from "./Account";
import NewAccountForm from "./NewAccountForm";

class AccountCtrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    };
    this.createAcc = this.createAcc.bind(this);
  }
  createAcc(acc) {
    this.setState({
      accounts: [...this.state.accounts, acc]
    });
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
    return (
      <div className="Account-container">
        <h1>Welcome to Your Accounts!</h1>
        <NewAccountForm submit={this.createAcc} />
        {showCurrAcc}
      </div>
    );
  }
}

export default AccountCtrl;
