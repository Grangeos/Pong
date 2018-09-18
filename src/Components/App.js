import React, { Component, Fragment } from 'react';
import Home from "./Home";
import Pong from "./Pong";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/game" exact component={Pong}/>



          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
