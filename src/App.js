import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import { filter } from 'ramda';
import './App.css';

import TrafficSignals from './components/trafficSignals';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pedestrianSignalData: {},
      signalOneData: {},
      signalTwoData: {}
    };
  }

  componentDidMount() {
    this.fetchSignalStatus();
    this.interval = setInterval(() => {
      this.fetchSignalStatus();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  processResponse(response) {
    let pedestrianSignalData = filter(s => s.pedestrianSignal == true, response.signals)[0];
    let signalOneData = response.signals[0];
    let signalTwoData = response.signals[1];

    console.log("pedestrianSignalData::", pedestrianSignalData);
    this.setState({
      pedestrianSignalData: pedestrianSignalData,
      signalOneData: signalOneData,
      signalTwoData: signalTwoData
    });
  }

  fetchSignalStatus() {
    console.log("calling");
    axios.get(`http://localhost:6060/signals/v2`)
      .then(res => {
        console.log("response::", res);
        this.processResponse(res.data);
      }).catch(error => console.log)
  }

  render() {
    // this.fetchSignalStatus();
    return (
      <div className="App">
        <header className="App-header">
          <div className="vehicle-signal"><TrafficSignals signalData={this.state.signalOneData} title="Road Signal 1" /></div>
          <div className="vehicle-signal"><TrafficSignals signalData={this.state.signalTwoData} title="Road Signal 2" /></div>
          <div className="vehicle-signal"><TrafficSignals signalData={this.state.pedestrianSignalData} title="Pedestrian Signal" /></div>
        </header>
      </div>
    );
  }
}

export default App;
