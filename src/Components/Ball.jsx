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
      }, 2);
  }

  rebond (position, segment, deviation) {
    var ballSegment = new Segment(position, this.state.trajectoire)
    var paddleIntersection = Segment.intersect(segment, ballSegment);

    if (paddleIntersection) {
      var vectorCollision = Vector.subtract(paddleIntersection, position);
      const vectorNextPosition = Vector.add(position, this.state.trajectoire);

      const vectorA = Vector.subtract(
          Vector.fromCoordinates(vectorNextPosition.coordinates.x, paddleIntersection.coordinates.y),
          paddleIntersection
      )

      const vectorB = Vector.subtract(
        vectorNextPosition,
        Vector.fromCoordinates(vectorNextPosition.coordinates.x, paddleIntersection.coordinates.y)
      );

      let newTrajectoire = Vector.subtract(vectorB, vectorA);

      if (deviation) {
        const impactPoint = paddleIntersection.coordinates.y - segment.position.coordinates.y;

        newTrajectoire = deviation(newTrajectoire, impactPoint, segment.vector.length)
      }

      const newPosition = Vector.add(paddleIntersection, newTrajectoire);

      if (vectorCollision.length > 0 ){
        this.setState({
          position: paddleIntersection
        }, () => {
          this.setState({
            trajectoire: new Vector(this.state.trajectoire.length, newTrajectoire.angle),
            position: newPosition
          })
        })
        return true;
      }
    }

    return false;
  }

  paddleDeviation (trajectoire, impactPoint, size) {console.log(trajectoire.angle)
    const deviationRatio = 40 / size;
    let deviation = 0-(20 - (deviationRatio * impactPoint));

    if (trajectoire.angle < -90 || trajectoire.angle > 90) {
      deviation = 0-deviation;
    }

    return trajectoire.rotate(deviation);
  }

  calculRaquette(position){
    var ballSegment = new Segment(position, this.state.trajectoire);

    const leftPaddle = document.getElementsByClassName("paddle left").item(0).getBoundingClientRect();
    var leftPaddlePosition = Vector.fromCoordinates(leftPaddle.right, leftPaddle.top );
    var leftPaddleVector = new Vector(leftPaddle.height, 90);
    var leftPaddleSegment = new Segment(leftPaddlePosition, leftPaddleVector);

    if (this.rebond(position, leftPaddleSegment, this.paddleDeviation)) {
      return null;
    }

    const rightPaddle = document.getElementsByClassName("paddle right").item(0).getBoundingClientRect();
    var rightPaddlePosition = Vector.fromCoordinates(rightPaddle.left, rightPaddle.top);
    var rightPaddleVector = new Vector(rightPaddle.height, 90);
    var rightPaddleSegment = new Segment(rightPaddlePosition, rightPaddleVector);

    if (this.rebond(position, rightPaddleSegment, this.paddleDeviation)) {
      return null;
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
