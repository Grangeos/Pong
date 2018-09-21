import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import Ball from "./Ball";
import Paddle from "./Paddle";
import Wall from "./Wall";
import Score from "./Score";

const START_DELAY = 3;

class Pong extends Component {
  state = {
    score: [0, 0],
    overlayVisible: false,
    frame: null,
    stopped: false,
    timer: START_DELAY,
  }
  componentDidMount () {
    this.start();
  }

  componentDidUpdate (prevProps, { frame, timer }) {
    if (this.state.frame !== frame || timer != this.state.timer)
      this.start()
  }

  render() {
    const { score, overlayVisible, frame, timer } = this.state;

    return (
      <Fragment>
        <div className={"overlay " + (overlayVisible ? 'isVisible' : '')}>

        <p>Bien Jouer</p>
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
          <line className="center" x1="50%" x2="50%" y1="0%" y2="100%" strokeDasharray="30"   stroke="white" strokeWidth="4px" style={{opacity: 0.5}} />
          <Wall className="top" x1="0%" x2="100%" y1="0%" y2="0%" />
          <Wall className="bottom" x1="0%" x2="100%" y1="100%" y2="100%" />
          <Score frame={frame} className="left">{score[0]}</Score>
          <Score frame={frame} className="right">{score[1]}</Score>
          { !!timer && <text className="pongTimer" x="43%" y="60%" font-size="400" fill="white">{Math.round(timer)}</text>}
         </svg>
       </Fragment>
    );
  }

  onPoint = (i) => {
    const { score } = this.state;

    const newScore = [...score];

    newScore[i] += 1;

    const stopped = newScore[i] > 9;

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
    const { stopped, timer } = this.state;

    if (stopped && !init)
      return;

    const newState = {}

    if (init) {
      newState.stopped = false;
    }

    requestAnimationFrame((timestamp) => {
      const tsSec = (timestamp / 1000);

      if (timer) {
        newState.timer = Math.max(START_DELAY - tsSec, 0);
      } else {
        newState.frame = timestamp;
      }
      this.setState(newState);
    });
  }

  stop () {
    this.setState({
      stopped: true,
    })
  }
}

export default Pong;
