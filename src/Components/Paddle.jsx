import React, { Component, Fragment } from 'react';
import cx from "classnames";

class Paddle extends Component {
  state = {
    mooving: null,
    position: 50,

  };
  componentWillMount(){
    document.addEventListener('keydown', (event) => {
      const { mooving } = this.state;

      switch (event.key){
        case this.props.upArrow:
          if (mooving === "up") break;
          this.setState({mooving:"up"})
          break;

        case this.props.downArrow:
          if (mooving === "down") break;
          this.setState({mooving:"down"})
          break;
      }
    });

    document.addEventListener('keyup', (event) => {

      switch (event.key){
        case this.props.upArrow:
        case this.props.downArrow:
          this.setState({ mooving: null })
          break;
      }
    });

    setInterval(() => {
      const { mooving, position } = this.state;

      if (mooving === "up") {
        if (position <= 0) {
          this.setState({ mooving: null, position: 0 })
          return

        }
        this.setState({position: position - 0.7} )
      } else if (mooving === "down") {
        if (position >= 100) {
          this.setState({ mooving: null, position: 100 })
          return

        }
        this.setState({position: position + 0.7} )
      }
    }, 10);
  }

  render() {
    return (
      <rect className={cx("paddle", this.props.className)} style={{ y: `calc(${this.state.position}% - 80px)`}} />
    );
  }
}

export default Paddle;
