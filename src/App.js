import React, { Component } from 'react';
import './App.css';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {rotation: 0};
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    this.monthsDivs = [];
    for (let i = 0; i < months.length; i++) {
      let m = months[i];
      let classes = "month " + m;
      this.monthsDivs.push(<div key={m} className={classes}>{m}</div>);
    }
  }

  tick() {
    let d = new Date();
    let start = new Date(d.getFullYear(), 0, 0, 0, 0, 0);
    let end =  new Date(d.getFullYear() + 1, 0, 0, 0, 0, 0);
    let p = (d - start) / (end - start);
    let deg = 360 * p - 180; // substracting 180 since the arm defaults to june
    this.setState({
      rotation: deg
    });
  }

  componentDidMount() {
    this.tick()
    this.timerID = setInterval(
      () => this.tick(),
      60 * 60 * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div className="App">
        <div className="clock">
          {this.monthsDivs}
          <div className="arm"
               style={{transform: 'rotate(' + this.state.rotation + 'deg)'}}>
          </div>
          <div className="dot"></div>
        </div>
      </div>
    );
  }
}
