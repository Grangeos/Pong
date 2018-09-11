const _length = Symbol("length");
const _angle  = Symbol("length");

class Vector {
  static add (...vectors) {
    const [x, y] = vectors.reduce((acc, v) => {
      const [x, y] = acc;
      const { x: vx, y: vy} = v.coordinates;

      return [x+vx, y+vy];
    }, [0, 0]);

    return new Vector(
      Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
      Math.atan2(y, x) * 180 / Math.PI
    );
  }

  static subtract (...vectors) {
    const [x, y] = vectors.reduce((acc, v) => {
      const [x, y] = acc;
      const { x: vx, y: vy} = v.coordinates;

      return [x-vx, y-vy];
    }, [0, 0]);

    return new Vector(
      Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
      Math.atan2(y, x) * 180 / Math.PI
    );
  }

  get angle () {
    return this[_angle];
  }

  get length () {
    return this[_length];
  }

  get coordinates () {
    return {
      x: Math.round(this.length * Math.cos(this.angle * (Math.PI/180))),
      y: Math.round(this.length * Math.sin(this.angle * (Math.PI/180)))
    }
  }

  constructor (length, angle) {
    this[_angle] = angle;
    this[_length] = length;
  }

  rotate (angle) {
    this[_angle] = this[_angle] + angle;
  }
}

export default Vector;
