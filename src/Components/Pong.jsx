import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import Ball from "./Ball";
import Paddle from "./Paddle";
import Wall from "./Wall";
import Score from "./Score";

class Pong extends Component {
  state = {
    score: [0, 0],
    overlayVisible: false,
    frame: 0,
    stopped: false
  }
  componentDidMount () {
    this.start();
  }

  componentDidUpdate (prevProps, { frame}) {
    if (this.state.frame !== frame)
      this.start()
  }

  render() {
    const { score, overlayVisible, frame } = this.state;

    return (
      <Fragment>
        <div className={"overlay " + (overlayVisible ? 'isVisible' : '')}>

        <p>GG PGM</p>
        <p>{score[0]}/{score[1]}</p>
        <div className="buttonWrapper">
          <button onClick={this.retry}>Rejouer</button>
          <Link to="/"><button>Menu</button></Link>
        </div>

        </div>
        <svg className="pong" id="field">
          <Paddle frame={frame} className="left" upArrow="a" downArrow="q"/>
          <Paddle frame={frame} className="right" upArrow="p" downArrow="m"/>
          <Ball frame={frame} onPoint={this.onPoint} stop={this.stop}/>
          <line className="center" x1="50%" x2="50%" y1="0%" y2="100%" stroke-dasharray="30"   stroke="white" strokeWidth="4px" style={{opacity: 0.5}} />
          <Wall className="top" x1="0%" x2="100%" y1="0%" y2="0%" />
          <Wall className="bottom" x1="0%" x2="100%" y1="100%" y2="100%" />
          <Score frame={frame} className="left">{score[0]}</Score>
          <Score frame={frame} className="right">{score[1]}</Score>
         </svg>
       </Fragment>
    );
  }

  onPoint = (i) => {
    const { score } = this.state;

    const newScore = [...score];

    newScore[i] += 1;

    const stopped = newScore[i] > 8;

    this.setState({
      score: newScore,
      stopped
    })

    if (stopped) {
      this.setState({ overlayVisible: true, stopped: true, frame: null});
    }

    return stopped;
  }
  retry = () => {
    this.setState({score: [0, 0]})
    this.setState({ overlayVisible: false });

    this.start(true);

  }

  start (init = false) {
    const { stopped } = this.state;

    if (stopped && !init)
      return;

    const newState = {}

    if (init) {
      newState.stopped = false;
    }

    requestAnimationFrame((timestamp) => {
      newState.frame = timestamp;
      this.setState(newState);
    });
  }

  stop () {
    this.setState({
      stopped: true
    })
  }
}

export default Pong;
