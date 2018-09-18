import React, { Component } from 'react';
import cx from "classnames";

export default class Score extends Component {
  render () {
    const { className, ...props} = this.props;
    return (
      <span { ...props } className={cx("score", className)} />
    );
  }
}
