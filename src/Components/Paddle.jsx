import React, { Component, Fragment } from 'react';

class Paddle extends Component {
  componentWillMount(){
    this.props.upArrow
    this.props.downArrow

    document.addEventListener('keydown', (event) => {

  switch (event.key){
    case this.props.upArrow:
      console.log(event.key)
      break;

    case this.props.downArrow:
      console.log(event.key)
      break;


  }


});
  }
  render() {


    return (
      <Fragment>
        <span className="paddle">
        </span>
  
    </Fragment>
    );
  }
}

export default Paddle;
