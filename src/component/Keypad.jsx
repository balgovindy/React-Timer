import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button.jsx';
import './../style.css';

var keypadData = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["C", "0", "Reset"]
];

class Keypad extends React.Component {
  renderKey(i) {
    return keypadData[i].map((val, j) => <Button key={`button_${i}_${j}`} value={val} onClick={(value) => this.props.onClick(value)} />)
  }

  render() {
    const keypadArr = [];
    for (let i = 0; i < keypadData.length; i++) {
      keypadArr.push(
        <div key={`keypad_${i}`} id={`keypad_${i}`} className="keypad-row">
          {this.renderKey(i)}
        </div>
      )
    }
    return (
      <div>
        {
          !this.props.timeInterval &&
          (
            <div className="keypad">
              {keypadArr}
            </div>
          )
        }
      </div>
    );
  }
}

Keypad.defaultProps = {
  onClick: () => { }
}

Keypad.PropTypes = {
  onClick: PropTypes.func
}
export default Keypad;