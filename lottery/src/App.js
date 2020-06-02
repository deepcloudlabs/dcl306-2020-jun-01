import React from 'react';
import './App.css';
import Lottery from "./lottery";

export default class App extends React.Component {
  static i = 0;
  render(){
    App.i++;
    console.log("App.render() " +App.i);
    return (
        <Lottery></Lottery>
    );
  }
}