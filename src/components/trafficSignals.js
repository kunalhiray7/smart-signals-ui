import React from 'react';
import TrafficLight from 'react-trafficlight';
import Passenger from './passenger';

export default class TrafficSignals extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redOn: true,
            yellowOn: false,
            greenOn: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        let red = false, green = false, yellow = false;
        if (nextProps.signalData.nextStatus == 'RED') {
            red = true;
            green = false;
            yellow = false;
        } else if (nextProps.signalData.nextStatus == 'GREEN') {
            red = false;
            green = true;
            yellow = false;

        } else if (nextProps.signalData.nextStatus == 'YELLOW') {
            red = false;
            green = false;
            yellow = true;
        }

        this.setState({
            redOn: red,
            yellowOn: yellow,
            greenOn: green
        });
    }

    addPassenger = (count) => {
        console.log("COUNT::", count);
        this.props.handleUpdate(count);
    }

    removePassenger = (count) => {
        console.log("COUNT::", count);
        this.props.handleUpdate(count);
    }

    render() {
        return (
            <div>
                <div className="title">{this.props.title}</div>
                <TrafficLight
                    Size={150}
                    onRedClick={() => this.setState({ redOn: !this.state.redOn })}
                    onYellowClick={() => this.setState({ yellowOn: !this.state.yellowOn })}
                    onGreenClick={() => this.setState({ greenOn: !this.state.greenOn })}

                    RedOn={this.state.redOn}
                    YellowOn={this.state.yellowOn}
                    GreenOn={this.state.greenOn}
                />
                <Passenger itemType={this.props.title === "Pedestrian Signal" ? "male" : "car"} 
                addHandler={this.addPassenger}
                removeHandler={this.removePassenger} />
            </div>
        )
    }
}