import React, { Component } from 'react';
import Ball from "./Ball";
import Paddle from "./Paddle";

class Pong extends Component {
  render() {
    return (
      <section className="pong">
        <Paddle upArrow="a" downArrow="q"/>
        <Paddle upArrow="p" downArrow="m"/>
        <Ball/>
        <span className="center">
        </span>
        <span className="score">
          5  2
        </span>
      </section>
    );
  }
}

export default Pong;
