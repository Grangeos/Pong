import React, { Component } from "react";
import { Link } from "react-router-dom";
class Home extends Component {
  render() {
    return (
      <section className="home">
        <p>PONG BY KYKY & RAPHY</p>
        <div className="buttonWrapper"><Link to="/game"><button>PRESS START 2 PLAYER LOCAL</button></Link></div>
      </section>
    );
  }
}

export default Home;
