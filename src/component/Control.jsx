import React from 'react';
import PropTypes from 'prop-types';

const Controls = (props) => (
  <div>
    <div className="controls">
      {
        props.status !== 'STARTED' && props.status !== 'STOPPED' &&
        <button
          className="btn btn-success btn-lg btn-block"
          onClick={props.onStart}
          disabled={!props.allowStart}
        >
          START
        </button>
      }
      {
        (props.status === 'STARTED' || props.status === 'STOPPED') &&
        <div className="controls">
          {
            props.status === 'STARTED' &&
            <button
              className="btn btn-danger btn-lg"
              onClick={props.onStop}
            >
              STOP
            </button>
          }
          {
            props.status === 'STOPPED' &&
            <button
              className="btn btn-success btn-lg"
              onClick={props.onResume}
            >
              RESUME
            </button>
          }
          <button
            className="btn btn-primary btn-lg"
            onClick={props.onReset}
          >
            RESET
          </button>
        </div>
      }
    </div>
  </div>
);

Controls.defaultProps = {
  status: null,
  allowStart: false,
  onStart: () => console.log('onStart'),
  onStop: () => console.log('onStop'),
  onResume: () => console.log('omResume'),
  onReset: () => console.log('onReset')
};

Controls.propTypes = {
  status: PropTypes.string,
  allowStart: PropTypes.bool,
  onStart: PropTypes.func,
  onResume: PropTypes.func,
  onStop: PropTypes.func,
  onReset: PropTypes.func
};

export default Controls;