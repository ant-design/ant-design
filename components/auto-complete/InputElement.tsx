import React from 'react';
import { findDOMNode } from 'react-dom';

export interface InputElementProps {
  children: React.ReactElement<any>;
}

export default class InputElement extends React.Component<InputElementProps, any> {
  private ele: HTMLInputElement;

  focus = () => {
    this.ele.focus ? this.ele.focus() : (findDOMNode(this.ele) as HTMLInputElement).focus();
  }
  blur = () => {
    this.ele.blur ? this.ele.blur() : (findDOMNode(this.ele) as HTMLInputElement).blur();
  }
  saveRef = (ele: HTMLInputElement) => {
    this.ele = ele;
    const { ref: childRef } = this.props.children as any;
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
