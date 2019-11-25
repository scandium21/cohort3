import React from 'react';
// {`I'm a ${this.props.is} comp`}
class MyComp extends React.Component {
  render() {
    return (
      <div>
        <h1>{`Greetings from ${this.props.from}!`}</h1>
        <p>Hello world</p>
      </div>
    );
  }
}

export default MyComp;
