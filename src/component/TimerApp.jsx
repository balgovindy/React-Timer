import React from 'react';
import Header from './Header.jsx';
import Display from './Display.jsx';
import Keypad from './Keypad.jsx';
import Control from './Control.jsx';

class TimerApp extends React.Component {
  constructor() {
    super();
    this.state = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      allowStart: null,
      blockUnit: null
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleStart() {
    if (this.state.status !== 'STARTED') {
      this.setState({
        status: 'STARTED',
        timeInterval: this.getTimeInMs()
      })

      this.interval = setInterval(() => {
        this.setState((prevState) => ({ timeInterval: prevState.timeInterval - 10 }));
        if (this.state.timeInterval === 0) {
          clearInterval(this.interval);
          this.setState(() => ({
            status: null,
            timeInterval: null,
            hours: '00',
            minutes: '00',
            seconds: '00'
          }));
        }
      }, 10);
    }
  }

  getTimeInMs() {
    return ((Number(this.state.hours) * 60 * 60) + (Number(this.state.minutes) * 60) + Number(this.state.seconds)) * 1000;
  }

  handleStop() {
    if (this.state.status === 'STARTED') {
      clearInterval(this.interval);
      this.setState(() => ({ status: 'STOPPED' }));
    }
  }

  handleReset() {
    clearInterval(this.interval);
    this.setState({
      status: null,
      timeInterval: null,
      hours: '00',
      minutes: '00',
      seconds: '00'
    }, this.onResetComplete);
  }

  onResetComplete() {
    this.allowStart()
  }

  handleResume() {
    if (this.state.status === 'STOPPED') {
      this.interval = setInterval(() => {

        this.setState((prevState) => ({
          status: 'STARTED',
          timeInterval: prevState.timeInterval - 10
        }));

        if (this.state.timeInterval === 0) {
          clearInterval(this.interval);
          this.setState(() => ({
            timeInterval: null,
            status: null,
            hours: '00',
            minutes: '00',
            seconds: '00'
          }));
        }
      }, 10);
    }
  }

  handleFocusChange(unit) {
    this.setState({ blockUnit: unit })
  }

  setHours(hours) {
    this.setState((prevState) => {
      hours = parseInt(this.formateUnit(prevState.hours + hours));
      return ({ hours: this.formateUnit(hours) });
    }
    )
  }

  setMinutes(minutes) {
    this.setState((prevState) => {
      if (prevState.minutes == 59) {
        prevState.minutes = "00"
      }
      minutes = parseInt(this.formateUnit(prevState.minutes + minutes));
      if (minutes > 59) {
        minutes = 59;
      }
      return ({ minutes: this.formateUnit(minutes) });
    }
    )
  }

  setSeconds(seconds) {
    this.setState((prevState) => {
      if (prevState.seconds == 59) {
        prevState.seconds = "00"
      }
      seconds = parseInt(this.formateUnit(prevState.seconds + seconds));
      if (seconds > 59) {
        seconds = 59;
      }
      return ({ seconds: this.formateUnit(seconds) });
    }
    )
  }

  formateUnit(time) {
    return time < 10 ? `0${time}` : time.toString().slice(time.toString().length - 2)
  };

  allowStart() {
    this.setState((prevState) => ({
      allowStart: prevState.status !== 'STARTED' && (parseInt(prevState.hours) > 0 || parseInt(prevState.minutes) > 0 || parseInt(prevState.seconds) > 0)
    }));
  }

  handleKeypadClick(timeValue) {
    const { blockUnit } = this.state;

    if ('Reset'.indexOf(timeValue) < 0) {
      switch (blockUnit) {
        case 'H':
          if (timeValue !== 'C') {
            this.setHours(timeValue);
          } else {
            this.setState({
              hours: '00'
            })
          }
          break;

        case 'M':
          if (timeValue !== 'C') {
            this.setMinutes(timeValue);
          } else {
            this.setState({
              minutes: '00'
            })
          }
          break;

        case 'S':
          if (timeValue !== 'C') {
            this.setSeconds(timeValue);
          } else {
            this.setState({
              seconds: '00'
            })
          }
          break;

        default:
          break
      }
    } else {
      this.setState({
        hours: '00',
        minutes: '00',
        seconds: '00'
      })
    }
    this.allowStart();
  }

  render() {
    return (
      <div><div>
        <Header title="Timer" /></div>
        <div className="container">
          <Display
            onFocusChange={(unit) => this.handleFocusChange(unit)}
            hours={this.state.hours}
            minutes={this.state.minutes}
            seconds={this.state.seconds}
            timeInterval={this.state.timeInterval}
          />

          <Keypad
            onClick={(val) => this.handleKeypadClick(val)}
            status={this.state.status}
            timeInterval={this.state.timeInterval}
          />

          <Control
            status={this.state.status}
            allowStart={this.state.allowStart}
            onStart={() => this.handleStart()}
            onStop={() => this.handleStop()}
            onReset={() => this.handleReset()}
            onResume={() => this.handleResume()}
          />
        </div>
      </div>
    )
  }
}

export default TimerApp;