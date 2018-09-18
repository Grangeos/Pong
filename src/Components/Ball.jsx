import React, { Component } from 'react';
import Vector, { Segment } from "../js/Vector";

class Ball extends Component {
  state = {
    trajectoire : null,
    position : null,
    defaultPosition: null
  }
  componentDidMount(){
      this.start(true);
  }

  start (init = false) {
    if (this._interval)
      return;

    const trajectoire = new Vector (3, [0, 180][Math.round(Math.random())]) //Longueur 10 et 0 degrées
    const { defaultPosition } = this.state;

    const newState = {
      trajectoire
    }

    if (init) {
      const boundingRect = document.getElementById("ball").getBoundingClientRect()
      const x = boundingRect.left; // vecteur position x depart
      const y = boundingRect.top; // vecteur position y depart
      const position = Vector.fromCoordinates(x, y);

      newState.position = position;
      newState.defaultPosition = position;
    } else {
      newState.position = defaultPosition;
    }

    this.setState(newState);


    this._interval = setInterval(() => {
      const { trajectoire, position } = this.state;
      this.calculRaquette(Vector.add(position, trajectoire));
      this.score()
    }, 1);
  }

  stop(){
    if (!this._interval)
      return;

    clearInterval(this._interval);

    this._interval = null;

    this.start();
  }

  rebond (position, segment, deviation) {
    const { trajectoire } = this.state;
    const ballSegment = new Segment(position, trajectoire)
    const intersection = Segment.intersect(segment, ballSegment);


    if (intersection) {
      const vectorCollision  = Vector.subtract(intersection, position);

      const segmentNormeUnit = Vector.fromCoordinates(segment.vector.coordinates.y, -segment.vector.coordinates.x).rotate(180).normalize()

      const projection = segmentNormeUnit.multiply(vectorCollision.multiplyV(segmentNormeUnit));

      const reflectedVectorUnit = projection.multiply(2).add(vectorCollision).normalize();

      const vectorComplement = reflectedVectorUnit.multiply(trajectoire.length - vectorCollision.length);

      const newPosition = Vector.add(intersection, vectorComplement);

      let newTrajectoire = reflectedVectorUnit.multiply(trajectoire.length);

      if (deviation) {
        const impactPoint = intersection.coordinates.y - segment.position.coordinates.y;

        newTrajectoire = deviation(newTrajectoire, impactPoint, segment.vector.length)
      }

      this.setState({
        trajectoire: newTrajectoire,
        position: intersection
      }, () => {
        this.setState({
          position: newPosition
        })
      });

      return true;
    }

    return false;
  }

  paddleDeviation (trajectoire, impactPoint, size) {
    const ANGLE = 40;
    const deviationRatio = ANGLE / size;

    const impactPointFromMiddle = (size / 2) - Math.abs(impactPoint);

    let deviation = impactPointFromMiddle * deviationRatio;

    const newTrajectoire = trajectoire.rotate(deviation)

    return newTrajectoire;
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

    const topWall = document.getElementsByClassName("wall top").item(0).getBoundingClientRect();
    var topWallPosition = Vector.fromCoordinates(topWall.left, topWall.bottom);
    var topWallVector = new Vector(topWall.width, 0);
    var topWallSegment = new Segment(topWallPosition, topWallVector);

    if (this.rebond(position, topWallSegment)) {
      return null;
    }

    const bottomWall = document.getElementsByClassName("wall bottom").item(0).getBoundingClientRect();
    var bottomWallPosition = Vector.fromCoordinates(bottomWall.right, bottomWall.top);
    var bottomWallVector = new Vector(bottomWall.width, -180);
    var bottomWallSegment = new Segment(bottomWallPosition, bottomWallVector);

    if (this.rebond(position, bottomWallSegment)) {
      return null;
    }

    this.setState({
      position
    })

  }

  score(){
    const fieldRect = document.getElementById("field").getBoundingClientRect()
    const ballRect = document.getElementById("ball").getBoundingClientRect()
    const pointRight = document.getElementById("rightScore")
    const pointLeft = document.getElementById("leftScore")
    const total = 10;
    if (fieldRect.left > ballRect.right) {
      this.stop();
    }
    if (fieldRect.right < ballRect.left) {
      this.stop();
    }

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
