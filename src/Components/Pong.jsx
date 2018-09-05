import React, { Component } from 'react';
import Ball from "./Ball";
import Paddles from "./Paddles";

class Pong extends Component {
  render() {
    return (
      <section className="pong">
        <Paddles/>
        <Ball/>
        <span className="score">
          5  2
        </span>
      </section>
    );
  }
}

export default Pong;
