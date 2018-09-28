import React, { Component } from 'react';
import { getGameInfo } from './httpService/httpService';
import Wheel from './components/wheel/wheel';
import './App.scss';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      degsRotated: 40,
      items: [],
    }
    this.radius = 300;
    this.setDegsRotated = this.setDegsRotated.bind(this);
  }

  componentDidMount() {
    this.setState({items: getGameInfo()});
  }

  setDegsRotated() {
    const { items, degsRotated } = this.state;
    const thetaDeg = 360/items.length;
    const spinSize = (-1)*(items.length * 2 + (Math.ceil(Math.random() * items.length)));
    const newDegrees = degsRotated + (spinSize * thetaDeg)
    this.setState({ degsRotated: newDegrees });
    const index = Math.round((items.length - (((Math.abs(degsRotated + (spinSize * thetaDeg)))/thetaDeg))%items.length)%(items.length));
    console.log(items[index].label);
  }

  render() {
    const { items, degsRotated } = this.state;

    return items.length !== 0
    ? (<div className="App">
        <Wheel
          items={items}
          radius={this.radius}
          onClick={this.setDegsRotated}
          degsRotated={degsRotated}
        />
      </div>)
    : <div>loading...</div>
  }
}

export default App;
