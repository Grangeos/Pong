import React, { Component } from 'react';
import Vector, { Segment } from "../js/Vector";


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
        this.calculRaquette(Vector.add(position, trajectoire));
      }, 20);
  }

  calculRaquette(position){
    var ballSegment = new Segment(position, this.state.trajectoire);

    const leftPaddle = document.getElementsByClassName("paddle left").item(0).getBoundingClientRect();
    var leftPaddlePosition = Vector.fromCoordinates(leftPaddle.right, leftPaddle.top );
    var leftPaddleVector = new Vector(leftPaddle.height, 90);
    var leftPaddleSegment = new Segment(leftPaddlePosition, leftPaddleVector);

    var leftPaddleIntersection = Segment.intersect(leftPaddleSegment, ballSegment);

    const rightPaddle = document.getElementsByClassName("paddle right").item(0).getBoundingClientRect();
    var rightPaddlePosition = Vector.fromCoordinates(rightPaddle.left, rightPaddle.top);
    var rightPaddleVector = new Vector(rightPaddle.height, 90);
    var rightPaddleSegment = new Segment(rightPaddlePosition, rightPaddleVector);

    var rightPaddleIntersection = Segment.intersect(rightPaddleSegment, ballSegment);

    if (rightPaddleIntersection) {
      console.log(rightPaddleIntersection);
      var vectorCollision = Vector.subtract(rightPaddleIntersection, position);
      if (vectorCollision.length > 0 ){
        this.setState({
          position: rightPaddleIntersection
        }, () => {
          this.setState({
            trajectoire: this.state.trajectoire.rotate(180),
            position: Vector.add(
              position,
              Vector.subtract(
                this.state.trajectoire,
                vectorCollision
              ).rotate(180)
            )
          })
        })
        return;
      }
    }


    this.setState({
      position
    })

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
