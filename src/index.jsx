import React from 'react';
import ReactDOM from 'react-dom';
import TimerApp from './component/TimerApp.jsx'
import './style.css'


class App extends React.Component {

  render() {
    return (
      <TimerApp />
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'))