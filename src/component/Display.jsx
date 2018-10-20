import React from 'react';
import PropTypes from 'prop-types';
import TimeFormate from './../lib/TimeFormate';
import './../style.css';

const Display = (props) => {
  const time = new TimeFormate();
  return (
    <div>
      {
        props.timeInterval && (
          <div className="display-countdown">
            <div>
              <label type="text" className="display-countdown-label">H</label>
              <label type="text" className="display-countdown-label">M</label>
              <label type="text" className="display-countdown-label">S</label>
              <label type="text" className="display-countdown-label">MS</label>
            </div>
            <div className="display-countdown-time">
              {time.getTime(props.timeInterval)}
            </div>
          </div>
        )
      }

      {
        !props.timeInterval &&
        <div className="display">
          <div>
            <div>
              <label type="text" className="display-label">H</label>
              <label type="text" className="display-label">M</label>
              <label type="text" className="display-label">S</label>
            </div>

            <div className="input-group input-group-lg display-input-group">
              <input type="text"
                className="form-control display-time display-hours"
                maxLength="2"
                placeholder="00"
                value={props.hours}
                onFocus={() => props.onFocusChange('H')}
                onChange={props.onInputFilledChange}
              />

              <span className="display-time display-separator">:</span>

              <input type="text"
                className="form-control display-time display-minutes"
                maxLength="2"
                placeholder="00"
                value={props.minutes}
                onFocus={() => props.onFocusChange('M')}
                onChange={props.onInputFilledChange}
              />

              <span className="display-time display-separator">:</span>

              <input type="text"
                className="form-control display-time display-seconds"
                maxLength="2"
                placeholder="00"
                value={props.seconds}
                onFocus={() => props.onFocusChange('S')}
                onChange={props.onInputFilledChange}
              />
            </div>
          </div>
        </div>
      }
    </div>
  );
}

Display.defaultProps = {
  onFocusChange: () => console.log('onFocusChange'),
  onInputFilledChange: () => console.log('onInputFilledChange'),
  hours: '00',
  minutes: '00',
  seconds: '00',
  timeInterval: null
}

Display.propTypes = {
  onFocusChange: PropTypes.func,
  onInputFilledChange: PropTypes.func,
  hours: PropTypes.string,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  timeInterval: PropTypes.number
};

export default Display;