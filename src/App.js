import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import {filter} from 'ramda';
import './App.css';

import TrafficSignals from './components/trafficSignals';

class App extends Component {

  constructor(props) {
    super(props);  
    this.pedestrianSignalData = {};
    this.signalOneData = {};
    this.signalTwoData = {};
  }

  componentDidMount() {
    axios.get(`http://localhost:6060/signals/v2`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      }).catch(error => console.log)
  }

  processResponse(response) {
    this.pedestrianSignalData = filter(s => s.isPedestrianSignal, response.signals);
    this.signalOneData = response.signals[0];
    this.signalTwoData = response.signals[1];
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div className="vehicle-signal"><TrafficSignals signalData={this.signalOneData} title="Road Signal 1"/></div>
        <div className="vehicle-signal"><TrafficSignals signalData={this.signalTwoData} title="Road Signal 2"/></div>
        <div className="vehicle-signal"><TrafficSignals signalData={this.pedestrianSignalData} title="Pedestrian Signal"/></div>
        </header>
      </div>
    );
  }
}

export default App;
