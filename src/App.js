import React, { Component } from 'react';
import './App.css';


export default class App extends Component {
  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    var monthsDivs = [];
    for (let i = 0; i < months.length; i++) {
      let m = months[i];
      let classes = "month " + m;
      monthsDivs.push(<div key={m} className={classes}>{m}</div>);
    }
    // Calculate arm position
    let d = new Date();
    let start = new Date(d.getFullYear(), 0, 0, 0, 0, 0);
    let end =  new Date(d.getFullYear() + 1, 0, 0, 0, 0, 0);
    let p = (d - start) / (end - start);
    let deg = 360 * p - 180; // substracting 180 since the arm rests at june
    let armStyle = {
      transform: 'rotate(' + deg + 'deg)'
    };
    return (
      <div className="App">
        <div className="clock">
          {monthsDivs}
          <div className="arm" style={armStyle}></div>
      <div className="dot"></div>
        </div>
      </div>
    );
  }
}
