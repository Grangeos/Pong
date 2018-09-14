import React, { Component } from 'react';
import Vector, { Segment } from "../js/Vector";

class Ball extends Component {
  state = {
    trajectoire : null,
    position : null
  }
  componentDidMount(){
      const trajectoire = new Vector (3, 0) //Longueur 10 et 0 degrées
      const boundingRect = document.getElementById("ball").getBoundingClientRect()
      const x = boundingRect.left; // vecteur position x depart
      const y = boundingRect.top; // vecteur position y depart
      const position = Vector.fromCoordinates(x, y);
      this.setState({trajectoire, position});

      setInterval(() => {
        const { trajectoire, position } = this.state;
        this.calculRaquette(Vector.add(position, trajectoire));
      }, 2);
  }

  rebond (position, segment, deviation) {
    const { trajectoire } = this.state;
    const ballSegment = new Segment(position, trajectoire)
    const intersection = Segment.intersect(segment, ballSegment);


    if (intersection) {
      const vectorCollision  = Vector.subtract(intersection, position);

      const segmentNormeUnit = Vector.fromCoordinates(segment.vector.coordinates.y, -segment.vector.coordinates.x).rotate(180).normalize()

      const projection       = segmentNormeUnit.multiply(vectorCollision.multiplyV(segmentNormeUnit));

      const reflectedVectorUnit = projection.multiply(2).add(vectorCollision).normalize();

      const vectorComplement = reflectedVectorUnit.multiply(trajectoire.length - vectorCollision.length);

      const newPosition = Vector.add(intersection, vectorComplement);
      let newTrajectoire = reflectedVectorUnit.multiply(trajectoire.length);
/*
      const vectorNextPosition = Vector.add(position, trajectoire);

      const vectorA = Vector.subtract(
          Vector.fromCoordinates(vectorNextPosition.coordinates.x, intersection.coordinates.y),
          intersection
      )

      const vectorB = Vector.subtract(
        vectorNextPosition,
        Vector.fromCoordinates(vectorNextPosition.coordinates.x, intersection.coordinates.y)
      );

      let newTrajectoire = Vector.subtract(vectorB, vectorA);

      if (deviation) {
        const impactPoint = intersection.coordinates.y - segment.position.coordinates.y;

        newTrajectoire = deviation(newTrajectoire, impactPoint, segment.vector.length)
      }

      const newPosition = Vector.add(intersection, newTrajectoire);
*/
      if (vectorCollision.length > 0 ){
        this.setState({
          position: intersection
        }, () => {
          this.setState({
            trajectoire: newTrajectoire,
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
    const ballSegment = new Segment(position, this.state.trajectoire);

    const leftPaddle = document.getElementsByClassName("paddle left").item(0).getBoundingClientRect();
    var leftPaddlePosition = Vector.fromCoordinates(leftPaddle.right, leftPaddle.bottom );
    var leftPaddleVector = new Vector(leftPaddle.height, -90);
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
