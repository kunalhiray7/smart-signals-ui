import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Passenger extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          count: 0,
          items: []
      }
    }

    handleClick = (e) => {
        e.preventDefault();
        let newItems = this.state.items;
        let count = this.state.count;
        newItems.push(<FontAwesomeIcon icon={this.props.itemType} />);
        count = count + 1;

        this.setState((state, props) => ({
            count: state.count + 1,
            items: newItems
          }));
        this.props.addHandler(count);
    }

    handleRemove = (e) => {
        e.preventDefault();
        let count = this.state.count;
        count = count - 1;
        this.state.items.splice(0, 1)
        this.setState((state, props) => ({
            count: state.count - 1,
            items: state.items
          }));
        this.props.removeHandler(count);
    }

    render() {
      return (
        <div>
            <div className="items">
            {this.state.items.length > 0 && this.state.items.map((item, key) => {
                return <span key={key}>{item}</span>
            })}
            </div>
            <button onClick={this.handleClick}>ADD</button>
            <button onClick={this.handleRemove}>REMOVE</button>
        </div>
      )
    }
  }