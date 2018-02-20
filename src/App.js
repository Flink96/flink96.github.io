import React, { Component } from 'react';
import './App.css';
import List from "./components/list";
import Dairyapp from "./components/dairyapp"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dairyapp/>
        <List/>
      </div>
    );
  }
}

export default App;
