import React, { Component } from 'react';
import cx from "classnames";

export default class Score extends Component {
  render () {
    const { className, children, ...props} = this.props;
    return (
      <text { ...props } className={cx("score", className)}>
        {children}
      </text>
    );
  }
}
