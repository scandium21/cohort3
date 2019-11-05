import React from 'react';

class Icon extends React.Component {
  render() {
    return (
      <img
        onClick={this.props.onClick}
        src={this.props.source}
        className="icon"
        alt={this.props.alt}
      />
    );
  }
}

export default Icon;
