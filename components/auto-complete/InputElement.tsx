import React from 'react';
import { findDOMNode } from 'react-dom';

export default class InputElement extends React.Component<any, any> {
  private ele: HTMLInputElement;

  focus = () => {
    this.ele.focus ? this.ele.focus() : (findDOMNode(this.ele) as HTMLInputElement).focus();
  }
  blur = () => {
    this.ele.blur ? this.ele.blur() : (findDOMNode(this.ele) as HTMLInputElement).blur();
  }
  render() {
    return React.cloneElement(this.props.children, {
      ...this.props,
      ref: ele => this.ele = (ele as HTMLInputElement),
    }, null);
  }
}
