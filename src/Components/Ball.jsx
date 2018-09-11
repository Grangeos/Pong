import React, { Component } from 'react';
import Vector from "../js/Vector";

class Ball extends Component {
  state = {
    trajectoire : null,
    position : null
  }
  componentDidMount(){
      const trajectoire = new Vector (7, 0) //Longueur 10 et 0 degrées
      const boundingRect = document.getElementById("ball").getBoundingClientRect()
      const x = boundingRect.left; // vecteur position x depart
      const y = boundingRect.top; // vecteur position y depart
      const position = new Vector(
        Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
        Math.atan2(y, x) * 180 / Math.PI
      );
      this.setState({trajectoire, position});

      setInterval(() => {
        const { trajectoire, position } = this.state;

        this.setState({
          position: Vector.add(position, trajectoire)
        })
      }, 9);
  }

  render() {
    const {position} = this.state;
    const props = {};

    if (position) {
      props.style = {
        y: position.coordinates.y,
        x: position.coordinates.x
      }
    }
    return (
      <rect id="ball" className="ball" {...props} stroke="white" fill="white" />
    );
  }
}

export default Ball;
