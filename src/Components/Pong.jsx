import React, { Component } from 'react';
import Ball from "./Ball";
import Paddle from "./Paddle";

class Pong extends Component {

  render() {
    return (
      <svg className="pong" id="field">
        <Paddle className="left" upArrow="a" downArrow="q"/>
        <Paddle className="right" upArrow="p" downArrow="m"/>
        <Ball/>
        <line className="center" x1="50%" x2="50%" y1="0%" y2="100%" stroke="white" strokeWidth="2px" style={{opacity: 0.5}} />
        <line className="topWall" x1="0%" x2="100%" y1="0%" y2="0%"  strokeWidth="2px" />
        <line className="botWall"x1="0%" x2="100%" y1="100%" y2="100%"  strokeWidth="0.2px" />
        <line className="leftWall" x1="0%" x2="0%" y1="0%" y2="100%" strokeWidth="2px" />
        <line className="rightWall" x1="100%" x2="100%" y1="0%" y2="100%" strokeWidth="2px" />
      </svg>
    );
  }
}

export default Pong;
