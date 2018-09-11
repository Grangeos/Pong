import React, { Component, Fragment } from 'react';
import Pong from "./Pong";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Pong/>
      </Router>
    );
  }
}

export default App;
