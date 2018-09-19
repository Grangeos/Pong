import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import Ball from "./Ball";
import Paddle from "./Paddle";
import Wall from "./Wall";
import Score from "./Score";

class Pong extends Component {
  state = {
    score: [0, 0],
    stopped: false,
    overlayVisible: false,
  }

  render() {
    const { score, stopped, overlayVisible } = this.state;

    return (
      <Fragment>
        <div className={"overlay " + (overlayVisible ? 'isVisible' : '')}>

        <p>GG PGM</p>
        <p>{score[0]}/{score[1]}</p>
        <div className="buttonWrapper">
          <button onClick={this.retry()}>Rejouer</button>
          <Link to="/"><button>Menu</button></Link>
        </div>

        </div>
        <svg className="pong" id="field">
          <Paddle className="left" upArrow="a" downArrow="q"/>
          <Paddle className="right" upArrow="p" downArrow="m"/>
          { !stopped && <Ball onPoint={this.onPoint}/> }
          <line className="center" x1="50%" x2="50%" y1="0%" y2="100%" stroke-dasharray="30"   stroke="white" strokeWidth="4px" style={{opacity: 0.5}} />
          <Wall className="top" x1="0%" x2="100%" y1="0%" y2="0%" />
          <Wall className="bottom" x1="0%" x2="100%" y1="100%" y2="100%" />
          <Score className="left">{score[0]}</Score>
          <Score className="right">{score[1]}</Score>
         </svg>
       </Fragment>
    );
  }

  onPoint = (i) => {
    const { score } = this.state;

    const newScore = [...score];

    newScore[i] += 1;

    const stopped = newScore[i] > 1;

    this.setState({
      score: newScore,
      stopped
    })

    if (newScore[i] > 1) {
      this.setState({ overlayVisible: true });
        }

    return stopped;
  }
  retry(){
    this.setState({score: [0, 0]})
    this.setState({ overlayVisible: false });
    start()


  }

}

export default Pong;
