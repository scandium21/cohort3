import React from "react";

class Icon extends React.Component {
  render() {
    return (
      <img
        style={this.props.style}
        onClick={this.props.onClick}
        src={this.props.source}
        className="Icon"
        alt={this.props.alt}
      />
    );
  }
}

export default Icon;
