import React from 'react';
import './Icon.css';

class Icon extends React.Component {
  render() {
    return (
      <img
        style={this.props.style}
        onClick={this.props.onClick}
        src={this.props.source}
        className="Icon"
        alt={this.props.alt}
        title={this.props.title}
      />
    );
  }
}

export default Icon;
