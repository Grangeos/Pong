import React, { Component } from "react";
import { Link } from "react-router-dom";
import homeAudio from '../sound/home.mp3';
class Home extends Component {
  componentDidMount(){
    this.audio = new Audio(homeAudio);
    this.playSound();
  }

  playSound = () => {
      this.audio.currentTime = 29.5;
      this.audio.play();
  }

  stopSound = () => {
    this.audio.pause();
  }

  componentWillUnmount(){
    this.stopSound();
  }

  render() {
    return (
      <section className="home">
        <p><span>PONG</span><br/> BY KYKY & RAPHY</p>
        <div className="buttonWrapper"><Link to="/game"><button>PRESS START 2 PLAYER LOCAL</button></Link></div>
      </section>
    );
  }
}

export default Home;
