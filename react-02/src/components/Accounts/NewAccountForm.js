import React, { Component } from "react";
import uuid from "uuid/v4";

class NewAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accName: "",
      balance: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]:
        e.target.name === "balance"
          ? parseFloat(e.target.value)
          : e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleCreateAcc({ ...this.state, id: uuid() });
    this.setState({
      accName: "",
      balance: ""
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="createAcc">
            Create New Account:
            <input
              type="text"
              id="createAcc"
              name="accName"
              value={this.state.accName}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="initDep">
            Initial Deposit:
            <input
              type="number"
              id="initDep"
              name="balance"
              min={0}
              max={Number.MAX_SAFE_INTEGER}
              value={this.state.balance}
              onChange={this.handleChange}
            />
          </label>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default NewAccountForm;
