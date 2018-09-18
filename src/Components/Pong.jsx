import React, { Component } from 'react';
import Ball from "./Ball";
import Paddle from "./Paddle";
import Wall from "./Wall";
import Score from "./Score";

class Pong extends Component {

  render() {
    return (
      <svg className="pong" id="field">
        <Paddle className="left" upArrow="a" downArrow="q"/>
        <Paddle className="right" upArrow="p" downArrow="m"/>
        <Ball/>
        <line className="center" x1="50%" x2="50%" y1="0%" y2="100%" stroke="white" strokeWidth="2px" style={{opacity: 0.5}} />
        <Wall className="top" x1="0%" x2="100%" y1="0%" y2="0%" />
        <Wall className="bottom" x1="0%" x2="100%" y1="100%" y2="100%" />
        <Score className="right" />
        <Score className="left" />
       </svg>
    );
  }
}

export default Pong;
