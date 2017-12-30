import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface InputElementProps {
  children: React.ReactElement<any>;
}

export default class InputElement extends React.Component<InputElementProps, any> {
  private ele: HTMLInputElement;

  focus = () => {
    this.ele.focus ? this.ele.focus() : (ReactDOM.findDOMNode(this.ele) as HTMLInputElement).focus();
  }
  blur = () => {
    this.ele.blur ? this.ele.blur() : (ReactDOM.findDOMNode(this.ele) as HTMLInputElement).blur();
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
