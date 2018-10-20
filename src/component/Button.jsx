import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    return (
      <button
        className="btn btn-light btn-sm"
        onClick={() => this.props.onClick(this.props.value)}
      >
        {this.props.value}
      </button>
    );
  }
}

Button.PropTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
}

export default Button;