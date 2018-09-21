import React, { Component } from 'react';
import './App.css';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {rotation: 0, light: false};
    var months = [
      {name: 'January',  days: 31},
      {name: 'February', days: 28}, 
      {name: 'March',    days: 31},
      {name: 'April',    days: 30},
      {name: 'May',      days: 31},
      {name: 'June',     days: 30},
      {name: 'July',     days: 31},
      {name: 'August',   days: 31},
      {name: 'September',days: 30},
      {name: 'October',  days: 31},
      {name: 'November', days: 30},
      {name: 'December', days: 31}
    ];

    const now = new Date();

    // TODO encorporate this into tick fn
    // check for leap year https://stackoverflow.com/a/11595914
    const year = now.getFullYear();
    if(year & 3 === 0 && (year % 25 !== 0 || year & 15 === 0)) {
      months[1].days = 29;
    }

    // highlight the current day of month
    const month = now.getMonth();
    const day = now.getDate() - 1;

    this.daysDivs = [];
    this.monthsDivs = [];
    for(let i = 0; i < months.length; i++) {
      let dist = 'translateY(-40vmin)';
      let facing = `rotate(${i < 6 ? '-' : ''}90deg)`;
      let m = months[i].name;
      let s = {transform: `rotate(${i * 30}deg) ${dist} ${facing}`};
      let c = `month ${i === month && 'current'}`;
      this.monthsDivs.push(<div key={m} className={c} style={s}>{m}</div>);
      for(let d = 0; d < months[i].days; d++) {
        let r = i * 30 + ((d + 0.5) / months[i].days) * 30;
        let dist = `translateY(-${5 + d * 1.5}vmin)`;
        let s = {transform: `rotate(${r}deg) ${dist} ${facing}`};
        let c = `day ${(i === month && d === day) && 'current'}`;
        this.daysDivs.push((
          <div key={`${m}${d}`} className={c} style={s}>{d+1}</div>
        ));
      }
    }
  }

  tick() {
    let d = new Date();
    let start = new Date(d.getFullYear(), 0, 0, 0, 0, 0);
    let end =  new Date(d.getFullYear() + 1, 0, 0, 0, 0, 0);
    let p = (d - start) / (end - start);
    this.setState({
      rotation: p * 360 // convert to deg
    });
  }

  componentDidMount() {
    this.tick()
    this.timerID = setInterval(
      () => this.tick(),
      60 * 60 * 1000
    );

    // set light if query param
    if(window.location.search.includes('light')) {
      this.setState({light: true});
    }

    // load light or dark state if in chrome extension
    if(window.chrome && window.chrome.storage) {
      window.chrome.storage.local.get(['light'], r => {
        this.setState({light: r.light});
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  toggleColor() {
    this.setState({light: !this.state.light});
    // store setting in chrome extension
    if(window.chrome && window.chrome.storage) {
      window.chrome.storage.local.set({light: !this.state.light});
    }
  }

  render() {
    let cls = 'App';
    if (this.state.light) {
      cls += ' light';
    }
    return (
      <div className={cls}>
        <div className="clock">
          <div className="months">
            {this.monthsDivs}
          </div>
          <div className="days">
            {this.daysDivs}
          </div>
          <div className="arm"
               style={{transform: `rotate(${this.state.rotation}deg)`}}>
          </div>
          <div className="dot" onClick={() => this.toggleColor()}></div>
        </div>
      </div>
    );
  }
}
