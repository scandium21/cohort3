import React, { Component } from "react";

class AccountComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeAmt: 0,
      isChanging: false
    };
  }
  handleChangeAmt = e => {
    if (!e.target.value) return;
    this.setState({
      changeAmt: parseFloat(e.target.value)
    });
  };
  deposit = e => {
    e.preventDefault();
    this.props.onDeposit(this.state.changeAmt, this.props.acc.id);
    this.setState({
      changeAmt: 0
    });
  };
  withdraw = e => {
    e.preventDefault();
    this.props.onWithdraw(this.state.changeAmt, this.props.acc.id);
    this.setState({
      changeAmt: 0
    });
  };
  delAcc = e => {
    this.props.delAcc(this.props.acc.id);
  };
  render() {
    return (
      <div className="Account-container">
        <div>
          {this.props.acc.name}
          <span>Total On Deposit: {this.props.acc.balance}</span>
        </div>

        <div>
          <form>
            <label htmlFor="changeBal"></label>
            <div>
              <input
                type="Number"
                value={this.state.changeAmt !== 0 && this.state.changeAmt}
                onChange={this.handleChangeAmt}
              />
              <button onClick={this.deposit}>Deposit</button>
              <button onClick={this.withdraw}>Withdraw</button>
            </div>
          </form>
          <button onClick={this.delAcc}>Delete</button>
        </div>
      </div>
    );
  }
}

export default AccountComp;
