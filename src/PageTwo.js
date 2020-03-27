import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar.js'
import SideMenu from './SideMenu.js'


class PageOne extends Component {
  state = {sampleState: 'fk world'};

  render(){
     const { state } = this;
     const setState = state => this.setState(state);

     return <div onClick={() => setState({sampleState: 1})}>{state.sampleState}</div>;
  }
}

export default PageOne;