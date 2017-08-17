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
  saveRef = (ele: HTMLInputElement) => {
    this.ele = ele;
    const childRef = this.props.children.ref;
    if (typeof childRef === 'function') {
      childRef(ele);
    }
  }
  render() {
    return React.cloneElement(this.props.children, {
      ...this.props,
      ref: this.saveRef,
    }, null);
  }
}
