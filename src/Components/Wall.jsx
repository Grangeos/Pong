import React, { Component } from 'react';
import cx from "classnames";

export default class Wall extends Component {
  render () {
    const { className, ...props} = this.props;
    return (
      <line { ...props } className={cx("wall", className)} />
    );
  }
}
