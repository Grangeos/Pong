import React, { Component } from 'react';
import Vector, { Segment } from "../js/Vector";
import pongAudio from '../sound/audio_file.wav';

class Ball extends Component {
  state = {
    trajectoire : null,
    position : null,
    defaultPosition: null,
    stopped: true
  }
  componentDidMount(){
      this.audio = new Audio(pongAudio);
  }

  componentWillReceiveProps ({ frame }) {
    const { stopped } = this.state;
    if (frame !== null && this.props.frame !== frame) {
      if (stopped) {
        this.start(true);
      } else {
        this.moveBall();
      }
    }
  }

  start (init = false) {
    const trajectoire = new Vector (15, [0, 180][Math.round(Math.random())]) //Longueur 10 et 0 degrées
    const { defaultPosition } = this.state;

    const newState = {
      trajectoire,
      stopped: false
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
  }

  moveBall () {
    if (!document.getElementById("ball")) {
      return;
    }

    this.calculRaquette();
    this.score()
  }

  rebond (position, segment, deviation) {
    const { trajectoire } = this.state;
    const ballSegment = new Segment(position, trajectoire);

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
    const ACCELERATION = 3.5;
    const deviationRatio = ANGLE / size;
    const accelerationRatio = ACCELERATION / size;

    const impactPointFromMiddle = (size / 2) - Math.abs(impactPoint);

    let deviation = impactPointFromMiddle * deviationRatio;
    let acceleration = Math.abs(impactPointFromMiddle * accelerationRatio);

    const newTrajectoire = new Vector(trajectoire.length + acceleration, trajectoire.rotate(deviation).angle);

    return newTrajectoire;
  }

  handleRebondPaddle (position, paddle, paddlePosition, angle) {
    var paddleVector = new Vector(paddle.height, angle);
    var paddleSegment = new Segment(paddlePosition, paddleVector);

    if (this.rebond(position, paddleSegment, this.paddleDeviation)) {
      this.audio.currentTime = 0.6;
      this.audio.play();

      return true;
    }

    return false;
  }

  handleRebondWall (position, wall, wallPosition, angle) {
    var wallVector = new Vector(wall.width, angle);
    var wallSegment = new Segment(wallPosition, wallVector);

    return this.rebond(position, wallSegment);
  }

  calculRaquette(){
    const { position: p, trajectoire } = this.state;
    const position = Vector.add(p, trajectoire)
    const ballSegment = new Segment(position, trajectoire);

    const leftPaddle = document.getElementsByClassName("paddle left").item(0).getBoundingClientRect();
    var leftPaddlePosition = Vector.fromCoordinates(leftPaddle.right, leftPaddle.bottom );

    if (this.handleRebondPaddle(position, leftPaddle, leftPaddlePosition, -90)) {
      return;
    }

    const rightPaddle = document.getElementsByClassName("paddle right").item(0).getBoundingClientRect();
    var rightPaddlePosition = Vector.fromCoordinates(rightPaddle.left, rightPaddle.top);

    if (this.handleRebondPaddle(position, rightPaddle, rightPaddlePosition, 90)) {
      return;
    }

    const topWall = document.getElementsByClassName("wall top").item(0).getBoundingClientRect();
    var topWallPosition = Vector.fromCoordinates(topWall.left, topWall.bottom);

    if (this.handleRebondWall(position, topWall, topWallPosition, 0)) {
      return;
    }

    const bottomWall = document.getElementsByClassName("wall bottom").item(0).getBoundingClientRect();
    var bottomWallPosition = Vector.fromCoordinates(bottomWall.right, bottomWall.top);


    if (this.handleRebondWall(position, bottomWall, bottomWallPosition, -180)) {
      return;
    }

    this.setState({
      position
    })

  }

  score(){
    const fieldRect = document.getElementById("field").getBoundingClientRect()
    const ballRect = document.getElementById("ball").getBoundingClientRect();
    const pointRight = document.getElementById("rightScore")
    const pointLeft = document.getElementById("leftScore")

    if (fieldRect.left > ballRect.right) { //gauche
      if (!this.props.onPoint(1)) {
        this.start();
      }
    } else if (fieldRect.right < ballRect.left) { //droite
      if (!this.props.onPoint(0)) {
        this.start();
      }
    }

  }
  render() {
    const {position} = this.state;
    const {frame} = this.props;
    const elmtProps = {};

    if (position) {
      elmtProps.style = {
        y: position.coordinates.y,
        x: position.coordinates.x
      }
    }
    return (
      <rect id="ball" className="ball" {...elmtProps} stroke="white" fill="white" />
    );
  }
}

export default Ball;
