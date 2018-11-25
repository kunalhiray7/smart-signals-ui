import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import { filter } from 'ramda';
import './App.css';
import TrafficSignals from './components/trafficSignals';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMale, faFemale, faCar } from '@fortawesome/free-solid-svg-icons'

library.add(faMale)
library.add(faFemale)
library.add(faCar)

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

    this.setState({
      pedestrianSignalData: pedestrianSignalData,
      signalOneData: signalOneData,
      signalTwoData: signalTwoData
    });
  }

  fetchSignalStatus() {
    axios.get(`http://localhost:6060/signals/v2`)
      .then(res => {
        this.processResponse(res.data);
      }).catch(error => console.log)
  }

  fetchSignalStatusFor(signalId, signalSent) {
    axios.put(`http://localhost:6060/signals/${signalId}/${signalSent}`)
      .then(res => {
        this.processResponse(res.data);
      }).catch(error => console.log)
  }

  updateSignalOne = (count) => {
    this.fetchSignalStatusFor(1, count);
  }

  updateSignalTwo = (count) => {
    this.fetchSignalStatusFor(2, count);
  }

  updatePedestrianSignal = (count) => {
    this.fetchSignalStatusFor(3, count);
  }

  render() {
    // this.fetchSignalStatus();
    return (
      <div className="App">
        <header className="App-header">
          <div className="vehicle-signal">
            <TrafficSignals
              handleUpdate={this.updateSignalOne}
              signalData={this.state.signalOneData}
              title="Road Signal 1" />
          </div>
          <div className="vehicle-signal">
            <TrafficSignals
              handleUpdate={this.updatePedestrianSignal}
              signalData={this.state.pedestrianSignalData}
              title="Pedestrian Signal" />
          </div>
          <div className="vehicle-signal">
            <TrafficSignals
              handleUpdate={this.updateSignalTwo}
              signalData={this.state.signalTwoData}
              title="Road Signal 2" />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
