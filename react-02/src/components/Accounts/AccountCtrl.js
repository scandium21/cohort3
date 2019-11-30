import React, { Component } from 'react';
import AccountComp from './AccountComp';
import { AccountController } from './Account';
import NewAccountForm from './NewAccountForm';

class AccountCtrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: new AccountController()
    };
    this.createAcc = this.createAcc.bind(this);
  }
  createAcc(acc) {
    let newAccCtrl = this.state.accounts.makeCopy();
    newAccCtrl.addAccount(acc.accName, acc.balance, acc.id);
    this.setState({
      accounts: newAccCtrl
    });
  }
  onDeposit = (amt, id) => {
    let newAccCtrl = this.state.accounts.makeCopy();
    let acc = newAccCtrl.getAccByID(id);
    acc.deposit(amt);
    this.setState({
      accounts: newAccCtrl
    });
  };
  onWithdraw = (amt, id) => {
    let newAccCtrl = this.state.accounts.makeCopy();
    let acc = newAccCtrl.getAccByID(id);
    acc.withdraw(amt);
    this.setState({
      accounts: newAccCtrl
    });
  };
  delAcc = id => {
    let newAccCtrl = this.state.accounts.makeCopy();
    newAccCtrl.removeAccount(id);
    this.setState({
      accounts: newAccCtrl
    });
  };

  render() {
    const showCurrAcc = (
      <div>
        {this.state.accounts.checkAccounts().map(acc => (
          <AccountComp
            acc={acc}
            key={acc.id}
            onDeposit={this.onDeposit}
            onWithdraw={this.onWithdraw}
            delAcc={this.delAcc}
          />
        ))}
      </div>
    );
    let total = this.state.accounts.getTotal();
    let highBal = this.state.accounts.getHighestAcc().balance;
    let lowBal = this.state.accounts.getLowestAcc().balance;
    return (
      <div className="Account-container">
        <h1>Welcome to Your Accounts!</h1>
        <NewAccountForm handleCreateAcc={this.createAcc} />
        <div>Total balance: {0 || total}</div>
        <div>Highest balance: {highBal || 0}</div>
        <div>Lowest balance: {lowBal || 0}</div>
        {showCurrAcc}
      </div>
    );
  }
}

export default AccountCtrl;
